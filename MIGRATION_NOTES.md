# MIGRATION NOTES

## Apps Script版から変更した点

- Google Apps Script のWebアプリから、Cloudflare Pagesで公開できる静的サイト構成へ移行しました。
- 画面構成、文言、CSSは既存版をできるだけ維持し、GASテンプレート部分だけを最小限置き換えました。
- サーバー側で行っていた初期データ注入を、`fetch('/data/*.json')` による静的JSON読み込みへ変更しました。
- 回答後の採点、結果表示、履修計画の抽出はブラウザ内JavaScriptで完結します。
- 既存のApps Script版は `legacy/apps-script/` にコピーして残しています。

## 削除または置換したApps Script依存処理

- `doGet()` は削除し、各ページの `public/**/index.html` を直接配信する形にしました。
- `HtmlService` と `include(...)` は削除し、CSSは `public/assets/css/style.css`、JavaScriptは `public/assets/js/*.js` として読み込みます。
- `SpreadsheetApp` によるリアルタイム読み込みは削除し、質問・結果・授業情報をJSONへ静的化しました。
- `google.script.run` は本番用コードに使用していません。
- Apps Scriptのトリガー、WebアプリURL、PropertiesService、CacheService、ScriptApp は使用していません。

## 静的化したデータ

- `public/data/keyword.json`: キーワード診断の領域、キーワード、関連授業、共通メッセージ
- `public/data/questions.json`: 3分診断の質問、選択肢、結果テーマ、結果文
- `public/data/modules.json`: 履修プランナーのモジュール、曜日、時限、学部情報、初期条件
- `public/data/courses.json`: 履修プランナーの科目データ

## 内容を変更するときに編集するファイル

- キーワード診断のキーワード、領域説明、関連授業: `public/data/keyword.json`
- 3分診断の質問、選択肢、結果文、配点テーマ: `public/data/questions.json`
- 履修プランナーのモジュール名、曜日、時限、学部情報、初期条件: `public/data/modules.json`
- 履修プランナーの科目名、曜日、時限、学期、年次、単位数: `public/data/courses.json`
- 各ページのHTML構造: `public/index.html`, `public/keyword/index.html`, `public/diagnosis/index.html`, `public/planner/index.html`
- 各ページの動作: `public/assets/js/keyword.js`, `public/assets/js/diagnosis.js`, `public/assets/js/planner.js`

## 今後デザイン調整を行う場合

デザイン調整は今回は行っていません。後から見た目を整える場合は、主に `public/assets/css/style.css` を編集してください。

ページごとの見た目は `body.tool-keyword`、`body.tool-diagnosis`、`body.tool-planner`、`body.tool-home` でスコープされています。大きなレイアウト変更が必要な場合は、該当する `public/**/index.html` と対応する `public/assets/js/*.js` も確認してください。

## 移行時の確認結果

- `public/index.html`、`/keyword/`、`/diagnosis/`、`/planner/` をHTTP配信で確認しました。
- `public/data/questions.json`、`public/data/modules.json`、`public/data/courses.json` をHTTP配信で確認しました。
- `public/assets/js/keyword.js`、`public/assets/js/diagnosis.js`、`public/assets/js/planner.js` の構文確認を行いました。
- `public/` 配下に `doGet`、`HtmlService`、`google.script.run`、`SpreadsheetApp` が残っていないことを確認しました。
