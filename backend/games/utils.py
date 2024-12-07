import requests
from datetime import datetime
from .models import Genre, Tag

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
        "page_size": 1,
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
                print(game)

        return games

    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []
    
def fetch_game_data_by_id(game_id):
    endpoint = f"games/{game_id}"
    params = {
        "key": API_KEY
    }

    try:
        response = requests.get(API_URL + endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        print(data)
        return data

    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return None
    
def fetch_genres_data():
    endpoint = "genres"
    params = {
        "key": API_KEY,
        "page_size": 40,
        "page": 1
    }

    while True:
        try:
            
            response = requests.get(API_URL + endpoint, params=params)
            response.raise_for_status()
            data = response.json()
            genres = data.get("results", [])

            for genre in genres:
                obj, created = Genre.objects.update_or_create(
                    id=genre["id"], 
                    name=genre["name"]
                )

                print(f"{'Created' if created else 'Updated'}: {genre['name']}")
            
            params["page"] += 1

        except requests.exceptions.RequestException as e:
            print(f"Ошибка запроса: {e}")
            break

def fetch_tags_data():
    endpoint = "tags"
    params = {
        "key": API_KEY,
        "page_size": 1,
        "page": 1,
    }

    while True:
        try:
            response = requests.get(API_URL + endpoint, params=params)
            response.raise_for_status()
            data = response.json()
            tags = data.get("results", [])

            for tag in tags:
                obj, created = Tag.objects.update_or_create(
                    id=tag["id"], 
                    name=tag["name"]
                )

                print(f"{'Created' if created else 'Updated'}: {tag['name']}")

            params["page"] += 1

        except requests.exceptions.RequestException as e:
            print(f"Ошибка запроса: {e}")
            break
