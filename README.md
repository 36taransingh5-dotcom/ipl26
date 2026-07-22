# IPL 2026 Prediction Tracker

A mobile-first web application for a private, season-long IPL 2026 prediction tracker. Users submit per-match predictions (winner, toss winner, top scorer, top wicket taker, total boundaries) and compete on a leaderboard.

## Key Features

- Daily prediction form for the next upcoming match (winner, toss winner, top scorer, top wicket taker, total boundaries)
- Leaderboard component showing ranked players and points (currently backed by mock data on the frontend; no leaderboard API endpoint exists yet)
- Player and match data sync from the Sportmonks Cricket API into the local database
- REST API for creating predictions and fetching players/matches, with interactive docs via FastAPI's built-in Swagger UI

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, Uvicorn
- **Frontend**: React 19 (Vite), Tailwind CSS 4, ESLint

## Project Structure

```
backend/
  main.py          # FastAPI app and API routes
  models.py         # SQLAlchemy models (User, League, Match, Prediction, Player)
  schemas.py        # Pydantic request/response schemas
  database.py        # SQLAlchemy engine/session setup (SQLite)
  sportsmonks.py      # Sportmonks API client and sync-to-DB logic
  requirements.txt      # Backend dependencies (fastapi, uvicorn, sqlalchemy)
  test_api.py, test_players.py  # Ad-hoc test scripts

frontend/
  src/
    App.jsx                     # Root component
    components/DailyPredictionForm.jsx  # Prediction submission form
    components/MiniLeaderboard.jsx      # Leaderboard display (mock data)
  package.json         # Frontend dependencies and scripts
  vite.config.js       # Vite configuration
```

## Setup / Installation

### 1. Backend Setup

The backend is built with FastAPI and uses SQLite via SQLAlchemy.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`.
   Interactive API documentation (Swagger UI) is available at `http://localhost:8000/docs`.

### 2. Frontend Setup

The frontend is a React application built with Vite and Tailwind CSS.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at the URL printed in the terminal (usually `http://localhost:5173`).

## Usage

- Once both servers are running, open the frontend URL in a browser to view the prediction form and leaderboard.
- `GET /api/sync/matches` and `GET /api/sync/players` pull fixture and player data from the Sportmonks API into the local SQLite database.
- `GET /api/matches/next` returns the next match to predict on.
- `POST /api/predictions` creates a prediction (rejects duplicate predictions for the same user/match with a 400 error).
- `GET /api/players` lists synced players.

## Database Schema

The backend uses SQLAlchemy ORM with the following models (`backend/models.py`):

- **User**: `username`, `total_season_points`
- **League**: `league_name`, `unique_invite_code`
- **Match**: `team_a`, `team_b`, `match_date_time`, `match_status`
- **Prediction**: links a User and a Match; tracks `predicted_winner`, `toss_winner`, `top_scorer`, `top_wicket_taker`, `total_boundaries`
- **Player**: `fullname`, `image_path`

The SQLite database file (`ipl_app.db`) is created automatically in the `backend/` directory the first time the FastAPI server starts.

## Notes

- CORS is currently configured to allow all origins (`allow_origins=["*"]`) in `backend/main.py`; this is intended for local development only and should be restricted before any production deployment.
- `backend/sportsmonks.py` contains a hardcoded Sportmonks API key. This should be moved to an environment variable before the repository is made public or shared further.
