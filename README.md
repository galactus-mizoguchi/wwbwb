# プロジェクト概要

このワークスペースは、Katsuki Mizoguchiの個人サイト「wwbwb.com」を制作・開発しながら、AI活用のWeb制作を実験・学習するプロジェクトです。

## ディレクトリ構造

```
wwbwb/
├── README.md                 # プロジェクト概要（このファイル）
├── .cursor/                  # Cursor AI設定フォルダ
│   └── rules/                # 言語別・目的別ルールファイル
│       ├── global.mdc        # 全般的なルール
│       ├── html.mdc          # HTML固有のルール
│       ├── css.mdc           # CSS固有のルール
│       ├── javascript.mdc    # JavaScript固有のルール
│       ├── php.mdc           # PHP固有のルール
│       ├── directories.mdc   # プロジェクト構造ルール
│       └── design.mdc        # デザインガイドライン
├── docs/                     # ドキュメントフォルダ
│   └── CODING_STANDARDS.md   # コーディング規約（人間用）
├── index.html                # ルートファイル（メインサイト）
├── assets/                   # ルートサイトのアセット
│   ├── css/
│   │   ├── style.css
│   │   └── style.css.map
│   ├── js/
│   │   ├── script.js
│   │   └── plugins/
│   ├── img/
│   │   ├── projects/
│   │   └── ...
│   └── scss/                 # SCSSソースファイル
│       ├── foundation/
│       ├── layout/
│       ├── object/
│       └── vendor/
├── projects/                 # 個別プロジェクトフォルダ
│   ├── project-tamplate/     # プロジェクトテンプレート
│   │   ├── index.html
│   │   ├── README.md
│   │   └── assets/
│   │       ├── css/
│   │       ├── js/
│   │       └── img/
│   ├── 22-shrines/           # 既存プロジェクト例
│   │   ├── index.html
│   │   └── assets/
│   └── olympos/              # 既存プロジェクト例
│       ├── index.html
│       └── assets/
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

### SCSSについて
- ルートサイト（`index.html`）ではSCSSを使用してCSSを生成しています
- `assets/scss/` フォルダにSCSSソースファイルが格納されています
- コンパイル後のCSSは `assets/css/style.css` に出力されます
- 個別プロジェクト（`projects/`配下）では通常のCSSを使用することを推奨します

### コーディング規約
詳細は [CODING_STANDARDS.md](./docs/CODING_STANDARDS.md) を参照してください。

### Cursor AI設定
コーディング規約は以下のように管理されています:
- **`.cursor/rules/`**: 言語別・目的別のルールファイル（詳細版）
  - 各ファイルを編集する際、対応する `.mdc` ファイルのルールが自動的に適用されます
  - 例: HTMLファイル編集時 → `global.mdc` + `html.mdc` + `directories.mdc` + `design.mdc` が適用
  - 例: CSSファイル編集時 → `global.mdc` + `css.mdc` + `directories.mdc` + `design.mdc` が適用

## プロジェクト作成時の手順
1. `projects/project-tamplate/` をコピーして新しいプロジェクトを作成
2. プロジェクト名のディレクトリを作成（例: `projects/my-new-project/`）
3. `index.html` を編集して新しいプロジェクトの内容を記述
4. `assets/` フォルダ内のファイルを編集して新しいプロジェクトのデザインを実装

## 既存プロジェクト
- **22-shrines**: 神社プロジェクト
- **olympos**: オリュンポスプロジェクト
- **project-tamplate**: 新規プロジェクト作成時のテンプレート

## 注意事項
- 既存のHTML構造やCSSクラスは可能な限り保持する
- モバイルファーストのデザインを推奨
- セマンティックなHTMLを使用する

