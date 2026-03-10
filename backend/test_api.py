import requests

API_KEY = "Se2sKnEuKf5NMHTuqHUNx21HyARPptwxtyeAsImjS9OGD3ZCeAfyxaQe7jT1"
BASE_URL = "https://cricket.sportmonks.com/api/v2.0"

def test_fixtures():
    print("Testing Fixtures Endpoint...")
    url = f"{BASE_URL}/fixtures"
    params = {
        "api_token": API_KEY,
        "include": "localteam,visitorteam", # Try to include team names
        "filter[league_id]": 3 # Usually IPL is 3, we'll see if this works or if we just get upcoming
    }
    response = requests.get(url, params=params)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json().get('data', [])
        print(f"Found {len(data)} fixtures.")
        if data:
            print("Sample fixture:")
            print(data[0])
    else:
        print(response.text)
        
if __name__ == "__main__":
    test_fixtures()
