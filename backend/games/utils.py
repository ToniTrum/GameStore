import requests
from datetime import datetime
from .models import Platform, ESRBRating, Genre, Tag, Developer, Game, Screenshot

API_KEY = "de8b9e6752384a70986f0a2ee4b000e4"
API_URL = "https://api.rawg.io/api/"

def fetch_games_data():
    endpoint = "games"
    platforms_filter = {
        "PC": 4,
        "MacOS": 5,
        "Linux": 6
    }
    date_now = datetime.now().strftime("%Y-%m-%d")

    params = {
        "key": API_KEY,
        "dates": f"2000-01-01,{date_now}",
        "platforms": f"{','.join(map(str, platforms_filter.values()))}",
        "page_size": 40,
    }

    try:
        for page in range(1, 51):
            params["page"] = page

            response = requests.get(API_URL + endpoint, params=params)
            response.raise_for_status()
            data = response.json()
            games = data.get("results", [])
            
            for game in games:
                game_id = game["id"]
                name = game["name"]
                background_image = game["background_image"]
                description = ''
                esrb_rating = ESRBRating.objects.get(id=game["esrb_rating"]["id"])
                release_date = game["released"]
                platforms = game["platforms"]
                genres = []
                tags = []
                developers = []

                screenshots = []
                requirements = []

                genres_list = game["genres"]
                for genre in genres_list:
                    object_genre = Genre.objects.get(id=genre["id"])
                    if object_genre:
                        genres.append(object_genre)
                
                tags_list = game["tags"]
                for tag in tags_list:
                    object_tag = Tag.objects.get(id=tag["id"])
                    if object_tag:
                        tags.append(object_tag)

                game_details = fetch_game_data_by_id(game_id)
                if game_details:
                    description = game_details["description"]

                    platforms_list = game_details["platforms"]
                    for platform in platforms_list:
                        object_platform = Platform.objects.get(id=platform["platform"]["id"])
                        if object_platform:
                            platforms.append(object_platform)

                            object_requirement = platform["requirements"]
                            if object_requirement:
                                requirement = {
                                    "platform": object_platform,
                                    "game": game_id,
                                    "minimal": object_requirement["minimum"],
                                    "recommended": object_requirement["recommended"]
                                }
                                requirements.append(requirement)

                    developers_list = game_details["developers"]
                    for developer in developers_list:
                        object_developer = Developer.objects.get(id=developer["id"])
                        if not object_developer:
                            object_developer, created = Developer.objects.update_or_create(
                                id=developer["id"],
                                name=developer["name"]
                            )
                        developers.append(object_developer)

                    screenshots_list = game["short_screenshots"]
                    for screenshot in screenshots_list:
                        if screenshot["id"] != -1:
                            object_screenshot = {
                                "id": screenshot["id"],
                                "image": screenshot["image"],
                                "game": game_id
                            }
                            screenshots.append(object_screenshot)

                obj, created = Game.objects.update_or_create(
                    id=game["id"],
                    name=game["name"],
                    release_date=game["released"],
                    background_image=game["background_image"],
                    rating=game["rating"],
                    platforms=[Platform.objects.get(id=platforms_filter[platform]) for platform in game["platforms"]],
                    genres=[Genre.objects.get(id=genre["id"]) for genre in game["genres"]],
                    tags=[Tag.objects.get(id=tag["id"]) for tag in game["tags"]],
                    developers=[Developer.objects.get(id=developer["id"]) for developer in game["developers"]],
                )

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
