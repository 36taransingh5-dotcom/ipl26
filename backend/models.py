from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    total_season_points = Column(Integer, default=0)

    predictions = relationship("Prediction", back_populates="user")

class League(Base):
    __tablename__ = "leagues"

    id = Column(Integer, primary_key=True, index=True)
    league_name = Column(String, index=True)
    unique_invite_code = Column(String, unique=True, index=True)

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    team_a = Column(String, index=True)
    team_b = Column(String, index=True)
    match_date_time = Column(DateTime)
    match_status = Column(String, index=True) # e.g. Upcoming, Live, Completed

    predictions = relationship("Prediction", back_populates="match")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    match_id = Column(Integer, ForeignKey("matches.id"))
    predicted_winner = Column(String)
    toss_winner = Column(String)
    top_scorer = Column(String)
    top_wicket_taker = Column(String) # Added variable
    total_boundaries = Column(Integer)

    user = relationship("User", back_populates="predictions")
    match = relationship("Match", back_populates="predictions")

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, index=True)
    image_path = Column(String, nullable=True)
