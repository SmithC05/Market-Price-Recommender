import requests
import time

def verify_api():
    print("Testing API...")
    url = "http://localhost:8000/api/v1"
    
    # 1. Health
    try:
        r = requests.get("http://localhost:8000/")
        print(f"Health Check: {r.status_code} - {r.json()}")
    except Exception as e:
        print(f"Health Check Failed: {e}")
        return

    # 2. Predict
    payload = {"mandi": "Chennai", "crop": "Paddy", "days": 5}
    try:
        r = requests.post(f"{url}/predict", json=payload)
        if r.status_code == 200:
            print(f"Predict Success: Got {len(r.json()['predictions'])} predictions")
        else:
            print(f"Predict Failed: {r.text}")
    except Exception as e:
        print(f"Predict Error: {e}")

    # 3. Recommend (Weather inferred from Mandi)
    payload = {"mandi": "Chennai", "crop": "Paddy"}
    try:
        r = requests.post(f"{url}/recommend", json=payload)
        if r.status_code == 200:
            data = r.json()
            print(f"Recommend Success: {data['action']}")
            print(f"Metrics: Trend={data['metrics'].get('trend')}, Conf={data['metrics'].get('confidence_score')}%")
            print(f"Live Weather: {data['metrics'].get('weather_detail')}")
        else:
            print(f"Recommend Failed: {r.text}")
    except Exception as e:
        print(f"Recommend Error: {e}")

    # 4. Lifecycle - Plan
    try:
        r = requests.get(f"{url}/plan", params={"mandi": "Coimbatore"})
        if r.status_code == 200:
            print(f"Plan Success: {len(r.json()['recommendations'])} crops analyzed.")
        else:
            print(f"Plan Failed: {r.text}")
    except Exception as e:
        print(f"Plan Error: {e}")

    # 5. Lifecycle - Grow
    try:
        r = requests.get(f"{url}/grow", params={"mandi": "Coimbatore", "crop": "Paddy"})
        if r.status_code == 200:
            data = r.json()
            print(f"Grow Success: Weather Risk is {data['weather']['risk']}")
            print(f"Live Details: {data['weather']['details']}")
        else:
            print(f"Grow Failed: {r.text}")
    except Exception as e:
        print(f"Grow Error: {e}")

    # 6. Geolocation
    try:
        # Test with coords near Madurai
        r = requests.get(f"{url}/mandis/nearby", params={"lat": 9.9, "lon": 78.1})
        if r.status_code == 200:
            nearest = r.json()[0]
            print(f"Geo Success: Nearest is {nearest['name']} ({nearest['distance_km']} km)")
        else:
            print(f"Geo Failed: {r.text}")
    except Exception as e:
        print(f"Geo Error: {e}")

if __name__ == "__main__":
    time.sleep(5) # Wait for server
    verify_api()
