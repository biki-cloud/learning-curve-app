# コードの実装

- 初心者用にマークダウンをツールバーをビルトインで用意されている全てを表示したい
  - https://github.com/RIP21/react-simplemde-editor/issues/99
- preview の文字数をカウントし、作成画面や編集画面で文字数をリアルタイムで表示させ、0-300 文字は緑、300-1000 はオレンジ、1000 以上は赤にするとかわかりやすそう。
- markdown の toolbar で detail を追記するボタンを作成したい
  - https://zenn.dev/milky/articles/nextjs-markdown
- 作成した記事を Qiita に内容を投稿する機能
- 記憶の定着率をグラフとかで見えるかしたい。そんなページがあると最高
- 今日やったやつが２回目に出てくる。
- レベルが低いものから学習に出していく

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
