#!/bin/bash

# APIエンドポイント
API_URL="http://localhost:8080/api/learning"

# APIからデータを取得し、jqで整形してファイルに保存
curl -s "$API_URL" | jq '.' > output.json