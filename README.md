# プロジェクト概要

このワークスペースは、Web開発の実験・学習用プロジェクトです。

## ディレクトリ構造

```
public/
├── README.md                 # プロジェクト概要（このファイル）
├── .cursorrules              # Cursor AI用のコーディングルール（簡易版）
├── .cursor/                  # Cursor AI設定フォルダ
│   └── rules/                # 言語別・目的別ルールファイル
│       ├── global.mdc        # 全般的なルール
│       ├── html.mdc          # HTML固有のルール
│       ├── css.mdc           # CSS固有のルール
│       ├── javascript.mdc    # JavaScript固有のルール
│       ├── php.mdc           # PHP固有のルール
│       ├── directories.mdc   # プロジェクト構造ルール
│       └── design.mdc        # デザインガイドライン
├── .gitignore                # Git除外設定
├── .vscode/                  # VS Code設定フォルダ
├── docs/                     # ドキュメントフォルダ
│   └── CODING_STANDARDS.md   # コーディング規約（人間用）
├── index.php                 # ルートファイル
├── project-tamplate/         # プロジェクトテンプレート
│   ├── index.html
│   ├── README.md
│   └── assets/
│       ├── css/
│       └── js/
├── 22-shrines/               # 既存プロジェクト例
├── olympos/                  # 既存プロジェクト例
└── profile/                  # 既存プロジェクト例
```

## 基本的なルール

### ディレクトリ命名規則
- プロジェクトごとに独立したディレクトリを作成
- ディレクトリ名は小文字、ハイフン区切り（例: `lp-sample`, `admin-panel`）
- 各プロジェクトは自己完結型（必要なファイルをすべて含む）

### ファイル命名規則
- HTMLファイル: `index.html` または `[ページ名].html`（小文字、ハイフン区切り）
- CSSファイル: `style.css` または `[コンポーネント名].css`
- JavaScriptファイル: `script.js` または `[機能名].js`
- PHPファイル: `[機能名].php`（小文字、ハイフン区切り）

### ファイル構造
- **CSS、JavaScript、画像、フォントなどのアセットファイルは必ず`assets`フォルダ内に配置する**
- プロジェクト構造の例:
  ```
  project-name/
  ├── index.html
  └── assets/
      ├── css/
      │   └── style.css
      ├── js/
      │   └── script.js
      └── img/
          └── logo.png
  ```

### コーディング規約
詳細は [CODING_STANDARDS.md](./docs/CODING_STANDARDS.md) を参照してください。

### Cursor AI設定
コーディング規約は以下のように管理されています:
- **`.cursorrules`**: プロジェクト全体の方針を記載（簡易版）
- **`.cursor/rules/`**: 言語別・目的別のルールファイル（詳細版）
  - 各ファイルを編集する際、対応する `.mdc` ファイルのルールが自動的に適用されます
  - 例: HTMLファイル編集時 → `global.mdc` + `html.mdc` + `directories.mdc` + `design.mdc` が適用

## プロジェクト作成時の手順
1. `project-tamplate/` をコピーして新しいプロジェクトを作成
2. `index.html` を編集して新しいプロジェクトの内容を記述
3. `assets/` フォルダ内のファイルを編集して新しいプロジェクトのデザインを実装

## 注意事項
- 既存のHTML構造やCSSクラスは可能な限り保持する
- モバイルファーストのデザインを推奨
- セマンティックなHTMLを使用する

