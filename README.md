# 経済経営学部 診断ツール 静的サイト版

Google Apps Script で作成していた3つの診断・確認ツールを、GitHubで管理し、Cloudflare Pagesで公開できる静的Webサイトとして整理したプロジェクトです。

この版では、回答データや個人情報は保存しません。質問、結果文、授業情報、モジュール情報は `public/data/` のJSONを読み込み、採点や表示はブラウザ内のJavaScriptだけで完結します。

## ファイル構成

```text
su-keikei-tool/
├─ public/
│  ├─ index.html
│  ├─ keyword/
│  │  └─ index.html
│  ├─ diagnosis/
│  │  └─ index.html
│  ├─ planner/
│  │  └─ index.html
│  ├─ assets/
│  │  ├─ css/
│  │  │  └─ style.css
│  │  └─ js/
│  │     ├─ keyword.js
│  │     ├─ diagnosis.js
│  │     └─ planner.js
│  └─ data/
│     ├─ keyword.json
│     ├─ questions.json
│     ├─ modules.json
│     └─ courses.json
├─ legacy/
│  └─ apps-script/
│     ├─ keyword/
│     ├─ diagnosis/
│     └─ planner/
├─ README.md
└─ MIGRATION_NOTES.md
```

## ローカルでの確認方法

ビルドやnpmは不要です。`public/` を静的ファイルとして配信してください。

```powershell
python -m http.server 8788 --directory public --bind 127.0.0.1
```

ブラウザで以下を開きます。

- `http://127.0.0.1:8788/`
- `http://127.0.0.1:8788/keyword/`
- `http://127.0.0.1:8788/diagnosis/`
- `http://127.0.0.1:8788/planner/`

## Cloudflare Pages の公開設定

GitHubにこのリポジトリをpushし、Cloudflare Pagesで接続します。

- Framework preset: `None`
- Build command: 空欄
- Build output directory: `public`

この設定で、次のURL構成で公開されます。

- `/`
- `/keyword/`
- `/diagnosis/`
- `/planner/`

## Google Sites への埋め込み方法

Cloudflare Pagesで公開された各URLを、Google Sitesの「挿入」→「埋め込む」→「URL」から埋め込みます。

例:

- `https://example.pages.dev/keyword/`
- `https://example.pages.dev/diagnosis/`
- `https://example.pages.dev/planner/`

Google Sites側の表示幅が狭い場合は、埋め込み枠の高さを広めに設定してください。
