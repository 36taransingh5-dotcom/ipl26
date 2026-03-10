# IPL 2026 Prediction Tracker

A mobile-first web application for a private, season-long IPL 2026 prediction tracker. Users can join leagues, log daily match predictions, and compete on a global leaderboard.

## Project Structure

This project uses a decoupled architecture:
- **Backend**: Python + FastAPI + SQLite
- **Frontend**: React (Vite) + Tailwind CSS

---

## 🚀 Getting Started

Follow these steps to set up and run the application locally.

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
   You can view the interactive API documentation at `http://localhost:8000/docs`.

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

   The frontend will be available at the URL provided in the terminal (usually `http://localhost:5173`).

---

## 🗄️ Database Schema

The backend uses SQLAlchemy ORM with the following main models:

- **User**: Tracks `username`, `total_season_points`
- **League**: Tracks `league_name`, `unique_invite_code`
- **Match**: Tracks `team_a`, `team_b`, `match_date_time`, `match_status`
- **Prediction**: Links a User and a Match, tracking `predicted_winner`, `toss_winner`, `top_scorer`, `total_boundaries`

The SQLite database (`ipl_app.db`) will be automatically created in the `backend directory` when you first start the FastAPI server.
