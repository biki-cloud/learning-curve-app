# コードの実装

- 初心者用にマークダウンをツールバーをビルトインで用意されている全てを表示したい
  - https://github.com/RIP21/react-simplemde-editor/issues/99
- preview の文字数をカウントし、作成画面や編集画面で文字数をリアルタイムで表示させ、0-300 文字は緑、300-1000 はオレンジ、1000 以上は赤にするとかわかりやすそう。
- markdown の toolbar で detail を追記するボタンを作成したい
  - https://zenn.dev/milky/articles/nextjs-markdown
- 作成した記事を Qiita に内容を投稿する機能
- 記憶の定着率をグラフとかで見えるかしたい。そんなページがあると最高
- globals.css を入れると list の点が出ない問題。

- https://zenn.dev/yuyan/articles/716e0a5a288dc6#lexical%E3%81%A7%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%AA%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%82%A8%E3%83%87%E3%82%A3%E3%82%BF%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B
- https://github.com/facebook/lexical/tree/main
- https://zenn.dev/bosushi/articles/8274ab6d092439

# なんで作ったのか？

- 人は学習したことも９９%は頭から抜けていくのでせっかく学習した意味がない。
- 覚えたいことはなんでもいいよ！！

# デプロイするために

## 最低限

- google アカウントの作成
- backend, DB, Storage
  - ec2(docker-compose)
- frontend
  - vercel
- DB, storage
  - supabase

## あると良い

- domain

---

ダメだった

<div className="App" style={{ all: "unset" }}>

---

styles.css で marker をつける方法はあり。
やってみたけどインデントとか難しくて無理だった
