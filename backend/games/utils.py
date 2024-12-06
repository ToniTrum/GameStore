import requests
from datetime import datetime

API_KEY = "de8b9e6752384a70986f0a2ee4b000e4"
API_URL = "https://api.rawg.io/api/games"

def fetch_games_data():
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

    count = 0

    try:
        for page in range(1, 2):
            params["page"] = page

            response = requests.get(API_URL, params=params)
            response.raise_for_status()
            data = response.json()
            games = data.get("results", [])
            
            for game in games:
                print(f"Название: {game['name']}")
                print(f"Дата выхода: {game['released']}")
                print(f"Платформы: {[platform['platform']['name'] for platform in game['platforms']]}")
                print(f"Жанры: {[genre['name'] for genre in game['genres']]}")
                print(f"Рейтинг: {game['esrb_rating']}")
                print("=" * 40)
                print(game)

                count += 1

        print(f"Обработано игр: {count}")
        return games

    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []
