# PHP 8.2をベースにしたDockerイメージを使用
FROM php:8.2-fpm

# 作業ディレクトリを設定
WORKDIR /var/www/html

# Composerをインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 必要なPHP拡張機能をインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo_mysql

# ソースコードをコンテナにコピー
COPY . .

# 権限の設定
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 権限変更
RUN chmod -R 755 /var/www/html

# Laravelサーバーを起動
CMD php artisan serve --host=0.0.0.0 --port=8000

RUN apt-get update && apt-get install -y tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && echo "Asia/Tokyo" > /etc/timezone



