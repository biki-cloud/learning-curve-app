import json
import requests

def create_user(username, password, email):
    # create user
    url_user = "http://localhost:8080/api/users"

    body = {
            "username": username,
            "password": password,
            "email": email
            }

    response = requests.post(url_user, json=body)

    user_id = response.json()['id']

    return user_id

def get_output_dict():
    # output.jsonからデータを読み込む
    with open('output.json', 'r', encoding='utf-8') as file:
        data_list = json.load(file)

    return data_list

data_list = get_output_dict()

# APIエンドポイント
API_URL = "http://localhost:8080/api/learning"

# 各データをAPIにPOSTリクエストで送信
for data in data_list:
    user_id = create_user(data['user']['username'], 
                          data['user']['password'], 
                          data['user']['email'])

    # idキーは必要ないので削除
    del data['id']

    print(data)

    response = requests.post(API_URL, json=data)
    
    # レスポンスの確認
    if response.status_code == 201:
        print("successfull")
    else:
        print(f"failed: response: {response.text}, request body: {data}")