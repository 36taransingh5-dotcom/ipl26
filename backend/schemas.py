from pydantic import BaseModel, Field

class PredictionBase(BaseModel):
    user_id: int
    match_id: int
    predicted_winner: str
    toss_winner: str
    top_scorer: str
    total_boundaries: int

class PredictionCreate(PredictionBase):
    top_wicket_taker: str | None = None # Added based on UI, not in original DB schema, but good to have in schema. We don't save it yet unless we alter the DB model.
    # Actually, looking at the UI request "Top Wicket Taker", the DB model doesn't have it.
    # Let's add it to the schema, but we'll need to update the DB model too if we want to save it. 
    # For now, I will match the requested payload exactly.

class PredictionResponse(PredictionBase):
    id: int
    top_wicket_taker: str | None = None

    class Config:
        from_attributes = True

from datetime import datetime
class MatchResponse(BaseModel):
    id: int
    team_a: str
    team_b: str
    match_date_time: datetime | None = None
    match_status: str | None = None

    class Config:
        from_attributes = True

class PlayerResponse(BaseModel):
    id: int
    fullname: str
    image_path: str | None = None

    class Config:
        from_attributes = True
