import requests
from datetime import datetime
from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement

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
        for page in range(194, 201):
            params["page"] = page
            print(f"Page {page}:")
            print("-" * 40)

            response = requests.get(API_URL + endpoint, params=params)
            response.raise_for_status()
            data = response.json()
            games = data.get("results", [])
            
            for game in games:
                game_id = game["id"]
                print(f"Game ID: {game_id}")

                name = game["name"]
                print(f"Title: {name}")

                background_image = game["background_image"]
                print(f"Background Image: {background_image}")

                release_date = game["released"]
                print(f"Release Date: {release_date}")

                description = ''
                esrb_rating = None
                platforms = []
                genres = []
                tags = []
                developers = []
                screenshots = []

                requirements = []

                esrb_rating_list = game["esrb_rating"]
                if esrb_rating_list:
                    esrb_rating = ESRBRating.objects.get(id=esrb_rating_list["id"])
                print(f"ESRB Rating: {esrb_rating}")

                print("Genres:")
                genres_list = game["genres"]
                for genre in genres_list:
                    object_genre = Genre.objects.get(id=genre["id"])
                    if object_genre:
                        genres.append(object_genre)
                        print(f"- {object_genre}")

                print("Tags:")
                tags_list = game["tags"]
                for tag in tags_list:
                    try:
                        object_tag = Tag.objects.get(id=tag["id"])
                        if object_tag:
                            tags.append(object_tag)
                            print(f"- {object_tag}")
                    except Tag.DoesNotExist:
                        pass

                print("Screenshots:")
                screenshots_list = game["short_screenshots"]
                for screenshot in screenshots_list:
                    if screenshot["id"] != -1:
                        object_screenshot, created = Screenshot.objects.update_or_create(
                            id=screenshot["id"],
                            image=screenshot["image"]
                        )
                        screenshots.append(object_screenshot)
                        print(f"- {object_screenshot}")

                game_details = fetch_game_data_by_id(game_id)
                if game_details:
                    description = game_details["description"]

                    print("Platforms:")
                    platforms_list = game_details["platforms"]
                    for platform in platforms_list:
                        try:
                            object_platform = Platform.objects.get(id=platform["platform"]["id"])
                            if object_platform:
                                platforms.append(object_platform)
                                print(f"- {object_platform}")

                                object_requirement = platform["requirements"]
                                if object_requirement:
                                    requirement = {
                                        "platform": object_platform,
                                        "minimum": object_requirement.get("minimum", "There are no minimum requirements"),
                                        "recommended": object_requirement.get("recommended", "There are no recommended requirements"),
                                    }
                                    requirements.append(requirement)
                        except Platform.DoesNotExist:
                            pass

                    print(f"Description: {True if description != '' else 'N/A'}")

                    print("Developers:")
                    developers_list = game_details["developers"]
                    for developer in developers_list:
                        object_developer, created = Developer.objects.update_or_create(
                            id=developer["id"],
                            name=developer["name"]
                        )
                        developers.append(object_developer)
                        print(f"- {object_developer}")

                object_game, created = Game.objects.update_or_create(
                    id=game_id,
                    name=name,
                    background_image=background_image,
                    description=description,
                    release_date=release_date,
                )

                if esrb_rating:
                    object_game.esrb_rating = esrb_rating

                object_game.platforms.set(platforms)
                object_game.genres.set(genres)
                object_game.tags.set(tags)
                object_game.screenshots.set(screenshots)
                object_game.developers.set(developers)

                print(f"{'Created' if created else 'Updated'} -> {object_game}")

                print("Requirements:")
                for requirement in requirements:
                    object_requirement, created = Requirement.objects.update_or_create(
                        game=object_game,
                        platform=requirement["platform"],
                        minimum=requirement["minimum"],
                        recommended=requirement["recommended"]
                    )
                    print(f"{'Created' if created else 'Updated'} -> {object_requirement}")

                print("\n" + ("=" * 40) + "\n")

            print("-" * 40)

    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
    
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
