import requests
from sqlalchemy.orm import Session
import models
from datetime import datetime

API_KEY = "Se2sKnEuKf5NMHTuqHUNx21HyARPptwxtyeAsImjS9OGD3ZCeAfyxaQe7jT1"
BASE_URL = "https://cricket.sportmonks.com/api/v2.0"

def fetch_ipl_fixtures():
    """
    Fetches IPL fixtures from the Sportsmonks API.
    League ID 3 is for IPL based on our tests.
    """
    url = f"{BASE_URL}/fixtures"
    params = {
        "api_token": API_KEY,
        "include": "localteam,visitorteam",
        "filter[league_id]": 3
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json().get('data', [])
    except requests.RequestException as e:
        print(f"Error fetching fixtures: {e}")
        return []

def sync_matches_to_db(db: Session):
    """
    Fetches fixtures and upserts them into the SQLite database.
    """
    fixtures = fetch_ipl_fixtures()
    count = 0
    for fixture in fixtures:
        match_id = fixture.get('id')
        l_team = fixture.get('localteam') or {}
        localteam = l_team.get('code', 'Unknown')

        v_team = fixture.get('visitorteam') or {}
        visitorteam = v_team.get('code', 'Unknown')
        starting_at = fixture.get('starting_at')
        status = fixture.get('status', 'Upcoming')
        
        # Parse datetime
        # Format: '2018-10-12T16:00:00.000000Z'
        try:
            # Handle the .000000Z part
            time_str = starting_at.split('.')[0]
            match_date_time = datetime.strptime(time_str, "%Y-%m-%dT%H:%M:%S")
        except (ValueError, TypeError):
            match_date_time = datetime.utcnow() # fallback

        # Upsert match
        existing_match = db.query(models.Match).filter(models.Match.id == match_id).first()
        if existing_match:
            # Update existing
            existing_match.team_a = localteam
            existing_match.team_b = visitorteam
            existing_match.match_date_time = match_date_time
            existing_match.match_status = status
        else:
            # Create new
            new_match = models.Match(
                id=match_id,
                team_a=localteam,
                team_b=visitorteam,
                match_date_time=match_date_time,
                match_status=status
            )
            db.add(new_match)
        count += 1
    
    db.commit()
    return {"message": f"Successfully synced {count} matches."}

def fetch_players():
    """
    Fetches players from the Sportsmonks API.
    For MVP, we fetch a limited batch to avoid overloading the DB.
    """
    url = f"{BASE_URL}/players"
    params = {
        "api_token": API_KEY,
        "country_id": 98 # 98 is India (based on cricket teams generally), optimizing for IPL players
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json().get('data', [])
    except requests.RequestException as e:
        print(f"Error fetching players: {e}")
        return []

def sync_players_to_db(db: Session):
    """
    Fetches players and upserts them into the SQLite database.
    """
    players = fetch_players()
    count = 0
    for player in players:
        player_id = player.get('id')
        fullname = player.get('fullname', 'Unknown Player')
        image_path = player.get('image_path')
        
        # Upsert player
        existing_player = db.query(models.Player).filter(models.Player.id == player_id).first()
        if existing_player:
            existing_player.fullname = fullname
            existing_player.image_path = image_path
        else:
            new_player = models.Player(
                id=player_id,
                fullname=fullname,
                image_path=image_path
            )
            db.add(new_player)
        count += 1
        
    db.commit()
    return {"message": f"Successfully fetched and synced {count} players."}
