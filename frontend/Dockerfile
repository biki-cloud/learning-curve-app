# ベースイメージとしてNode.jsを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# アプリケーションを実行
CMD ["npm", "start"]

# ポートを公開
EXPOSE 3000
