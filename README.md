# TodoApp_React_Laravel_docker
docker環境にてフロントエンドをReact、バックエンドをLaravel、データベースをMySQLで作ったシンプルなTodoWebアプリケーションです。

まず、こちらのディレクトリをgit cloneして取り込んでください。

docker-compose up -d コマンドでdockerコンテナの立ち上げ＋起動を行いましょう。

起動できたらfrontendディレクトリに移動してnpm startを行いnpmサーバーを起動させましょう。

次にbackendディレクトリに移動しcomposer　update コマンドを入力しLaravelの依存関係のインストールを行いましょう。

インストールが終了したら.envファイルの記述を変更しましょう。（MySQLとの接続設定等）

ここまで終了したらphp artisan key:generate コマンドでapp_keyの生成を行いましょう。

最後にphp artisan migrate:fresh コマンドでマイグレーションを行いましょう。

ここまで終了したらhttp://localhost:3000/にアクセスするとReactで作成したフロントサイドページがhttp://localhost:8000/api/todosにアクセスするとLaravelで作成したバックエンドのページが開かれます。






