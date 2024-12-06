import requests
from datetime import datetime

API_KEY = "de8b9e6752384a70986f0a2ee4b000e4"
API_URL = "https://api.rawg.io/api/"

def fetch_games_data():
    endpoint = "games"
    platforms = {
        "PC": 4,
        "MacOS": 5,
        "Linux": 6
    }
    date_now = datetime.now().strftime("%Y-%m-%d")

    params = {
        "key": API_KEY,
        "dates": f"2000-01-01,{date_now}",
        "platforms": f"{','.join(map(str, platforms.values()))}",
        "page_size": 40,
    }

    try:
        for page in range(1, 2):
            params["page"] = page

            response = requests.get(API_URL + endpoint, params=params)
            response.raise_for_status()
            data = response.json()
            games = data.get("results", [])
            
            for game in games:
                print(f"Название: {game['name']}")
                print(f"Рейтинг: {game['esrb_rating']}")
                print("=" * 40)

        return games

    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []
    
def fetch_genres_data():
    endpoint = "genres"
    params = {
        "key": API_KEY,
    }

    try:
        response = requests.get(API_URL + endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        genres = data.get("results", [])

        for genre in genres:
            print(genre)
            print("=" * 40)

        return genres
    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []