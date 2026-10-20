# oz-coden.com UI Web

`oz-coden.com`系のWebサイトで使う、ビルド不要の共通CSS・JavaScriptです。色・タイポグラフィ・フォーム・カード・ヘッダー・テーマ切替を提供します。アプリ固有のレイアウトや処理は含みません。

## 導入

`assets/ui.css` と `assets/ui.js` を利用先の `vendor/ui/` にコピーします。利用するコミットとファイルのSHA-256は、利用先の `shared-ui.json` に記録します。コピー済みファイルを同梱するため、サイトの動作時にこのリポジトリへの通信やビルドは発生しません。

```html
<script src="vendor/ui/ui.js"></script>
<link rel="stylesheet" href="vendor/ui/ui.css">
<link rel="stylesheet" href="style.css">
```

`ui.js` は初期テーマを適用するため、`head` 内でCSSより前に読み込みます。

```html
<header class="ui-header" data-ui-header data-title="Example Tool"
        data-home="https://tools.oz-coden.com/"
        data-source="https://github.com/oz-coden/example-tool-web">
  <a class="ui-brand" href="https://tools.oz-coden.com/">oz-coden tools</a>
</header>
<main class="ui-main">
  <div class="ui-heading"><h1>Example Tool</h1></div>
  <section class="ui-panel">...</section>
</main>
```

## 更新

Node.js 22以降で、このリポジトリのチェックアウトから次を実行します。第2引数は利用先のディレクトリ、第3引数は取り込む40桁のコミットSHAです。

```sh
node scripts/sync-ui.mjs ../example-tool-web COMMIT_SHA
```

更新した `vendor/ui/` と `shared-ui.json` を利用先でコミットします。`vendor/ui/` は配布用のコピーです。共通部品の修正はこのリポジトリの `assets/` で行います。

## 提供するもの

- `.ui-header` と `data-ui-header`: ツール一覧・ソースへのリンクとテーマ切替
- `.ui-main`、`.ui-heading`、`.ui-panel`、`.ui-row`、`.ui-actions`: 共通レイアウト
- `.ui-button`、`.ui-button-primary`: ボタン
- `--c-*`: 色のトークン。個別CSSから参照できます。
- `window.OzUI`: `read` / `write` / `readJSON` / `copyText`
- `themeChanged`: `detail` に `light` または `dark` を持つイベント

テーマ設定は同一オリジンの `localStorage` に保存します。保存領域が利用できない場合もテーマ切替は動作します。別タブでのテーマ変更も反映します。
