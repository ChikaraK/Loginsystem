# Loginsystem
Node.jsのexpressと、sequelizeを利用したログイン機能の実装。※express-sessionの利用。

### 制作環境  
- Node.js:v10.15.3  
- Express:4.16.1  
- Sequelize CLI[CLI: 5.4.0, ORM: 5.8.6]  
- Mysql  
- EJS 

### 主な追加モジュール
- express-session
- express-validator
- sequelize(-cli)
- bcrypt

### 実装済機能  
- ユーザーアカウントを作成する機能
- ログイン画面からログインする機能
- ログインに成功した場合に、ログイン後の画面を表示する機能
- ログイン後の画面に未ログイン状態でアクセスするとログイン画面にリダイレクトする機能

### 使い方
- '/'でログイン後の画面
- '/users'でログイン画面へ
- '/users/add'で新規登録画面へ
