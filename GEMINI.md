# GEMINI.md

## 目的
- Gemini CLI 向けのコンテキストと作業方針を定義する。

## 出力スタイル
- 言語: 日本語
- トーン: 簡潔で事実ベース
- 形式: Markdown

## 共通ルール
- 会話は日本語で行う。
- PR とコミットは Conventional Commits に従う。
- PR タイトルとコミット本文の言語: PR タイトルは Conventional Commits 形式（英語推奨）。PR 本文は日本語。コミットは Conventional Commits 形式（description は日本語）。
- 日本語と英数字の間には半角スペースを入れる。

## プロジェクト概要
Simple web-based Markdown file viewer with GitHub-style CSS, accessible via local PHP server.

### 技術スタック
- **言語**: JavaScript, PHP, CSS
- **パッケージマネージャー**: none

## コーディング規約
- フォーマット: 既存設定（ESLint / Prettier / formatter）に従う。
- 命名規則: 既存のコード規約に従う。
- コメント言語: 日本語
- エラーメッセージ: 英語

### 開発コマンド
```bash
# install
No dependencies

# dev
start.sh (Linux) or start.bat (Windows)

# build
None - static files

# test
None

# lint
None

```

## 注意事項
- 認証情報やトークンはコミットしない。
- ログに機密情報を出力しない。
- 既存のプロジェクトルールがある場合はそれを優先する。

## リポジトリ固有
- **server**: PHP built-in web server (localhost:8080)
- **usage**: Place markdown files in files/ directory, start server, access http://localhost:8080/viewer
- **styling**: GitHub markdown CSS for consistent appearance
- **security_warning**: HTML tags not escaped - XSS risk with script tags
- **demo_url**: https://tomacheese.com/demo/markdown-viewer/viewer/
- **cross_platform**: Works on Linux (start.sh) and Windows (start.bat)