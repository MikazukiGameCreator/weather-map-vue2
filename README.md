# Weather Map Vue2

クリックした地点の雨量予報をグラフで表示するWebアプリケーション

## 機能
- OpenStreetMapを使用した地図表示
- クリックした地点の雨量予報を取得（Open-Meteo APIを使用）
- 雨量データをグラフで可視化
- レスポンシブデザイン対応

## 使用技術
- Vue.js 2
- Leaflet.js（地図表示）
- Chart.js（グラフ表示）
- Axios（API通信）
- Open-Meteo API（気象データ）

## Project setup
```
yarn install
```

### 開発用サーバーの起動
```
yarn serve
```

### 本番用ビルド
```
yarn build
```

### Lintの実行
```
yarn lint
```

## ライセンス
MIT

## 注意事項
- このアプリケーションはOpen-Meteo APIの利用規約に従って使用してください
- 天気予報データは参考情報として提供されます

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
