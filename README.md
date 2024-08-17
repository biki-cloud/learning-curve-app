# springboot-netxjs-template

# 目的

自分が個人アプリ開発をスムーズに作成するためにコードや CI/CD のテンプレートを作成する

## このテンプレートで確立すること

- アプリの要件定義 -> 設計, DB 設計 -> 開発 -> リリースのやり方
- アプリをデプロイするための aws での操作方法、やり方
- 構成図の作り方
- 新たに Google アカウント作成し、そこから aws アカウント作成 -> 1 年やってみる。 -> aws アカウント消す
  - aws アカウントでの費用が行き過ぎないようにリミットをかける
- rate-limit を入れたい. nextjs の方か
- aws にデプロイするときに teraform を使うと Infrastructure as code で便利だと思う。

DB: RDB(aws)
server: EC2(aws) frontend と backend を同じサーバでやる。
メディアコンテンツ: S3(aws)
モニタリング: xxx
