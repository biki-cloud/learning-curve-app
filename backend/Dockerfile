# ベースイメージとしてOpenJDKを使用
FROM openjdk:17-jdk-slim

# 作業ディレクトリを設定
WORKDIR /app

# Gradleラッパーと設定ファイルをコピー
COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

# プロジェクトのソースコードをコピー
COPY src src

# 依存関係をビルド
RUN ./gradlew build -x test 

# アプリケーションを実行
CMD ["java", "-jar", "build/libs/template-0.0.1-SNAPSHOT.jar"]
