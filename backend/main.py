from fastapi import FastAPI, Depends, HTTPException, status
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="IPL 2026 Prediction Tracker API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the IPL 2026 Prediction Tracker API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/sync/matches")
def sync_matches(db: Session = Depends(get_db)):
    from sportsmonks import sync_matches_to_db
    return sync_matches_to_db(db)

@app.get("/api/sync/players")
def sync_players(db: Session = Depends(get_db)):
    from sportsmonks import sync_players_to_db
    return sync_players_to_db(db)

@app.get("/api/players", response_model=List[schemas.PlayerResponse])
def get_players(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    players = db.query(models.Player).offset(skip).limit(limit).all()
    return players

@app.post("/api/predictions", response_model=schemas.PredictionResponse)
def create_prediction(prediction: schemas.PredictionCreate, db: Session = Depends(get_db)):
    # Check if a prediction already exists for this user and match
    existing_prediction = db.query(models.Prediction).filter(
        models.Prediction.user_id == prediction.user_id,
        models.Prediction.match_id == prediction.match_id
    ).first()
    
    if existing_prediction:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already locked in your prediction for this match!"
        )
    
    # Create new prediction
    db_prediction = models.Prediction(**prediction.model_dump())
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    return db_prediction

