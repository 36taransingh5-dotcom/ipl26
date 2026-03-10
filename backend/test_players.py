import requests

API_KEY = "Se2sKnEuKf5NMHTuqHUNx21HyARPptwxtyeAsImjS9OGD3ZCeAfyxaQe7jT1"
BASE_URL = "https://cricket.sportmonks.com/api/v2.0"

def test_players():
    print("Testing Players Endpoint...")
    url = f"{BASE_URL}/players"
    params = {
        "api_token": API_KEY,
        "country_id": 98 # Try India's country ID if we know it, or just plain players
    }
    response = requests.get(url, params=params)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json().get('data', [])
        print(f"Found {len(data)} players.")
        if data:
            print("Sample player:")
            print(data[0])
    
if __name__ == "__main__":
    test_players()
