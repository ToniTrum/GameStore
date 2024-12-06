import requests

API_KEY = "687a4614fe63ca4b2134d041b1f40db99c3dc0c4"
API_URL = "https://www.giantbomb.com/api/"

HEADERS = {
    "User-Agent": "Django+React Web App",
}

def fetch_all_games():
    endpoint = f"{API_URL}games/"
    games = []
    page = 1
    limit = 100

    while True:
        params = {
            "api_key": API_KEY,
            "format": "json",
            "limit": limit,
            "offset": (page - 1) * limit,
        }

        response = requests.get(endpoint, headers=HEADERS, params=params)
        data = response.json()

        if "results" in data:
            games.extend(data["results"])
            print(data["results"])

            # Если текущая страница меньше количества доступных страниц, продолжать запросы
            if page * limit >= data["number_of_total_results"]:
                break
            page += 1
        else:
            print("Ошибка:", data)
            break

    return games