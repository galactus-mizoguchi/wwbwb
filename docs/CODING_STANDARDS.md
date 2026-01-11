# コーディング規約 (Coding Standards)

このドキュメントは、プロジェクトで使用するコーディング規約をまとめたものです。  
AI（Cursor）向けのルールは `.cursor/rules/` 配下に分割されていますが、こちらは人間が読むための包括的なガイドラインです。

---

## 目次

1. [基本方針](#基本方針)
2. [全般的なルール](#全般的なルール)
3. [HTML](#html)
4. [CSS](#css)
5. [JavaScript](#javascript)
6. [PHP](#php)
7. [プロジェクト構造](#プロジェクト構造)
8. [デザインガイドライン](#デザインガイドライン)
9. [ベストプラクティス](#ベストプラクティス)

---

## 基本方針

### 言語使用ルール
- **会話・コメント**: 日本語を使用
- **変数名・関数名**: 英語で記述（説明的な名前を使用）
- **可読性重視**: モダンな構文を積極的に採用

### 技術スタック
- **HTML**: Semantic HTML5
- **CSS**: Vanilla CSS（フレームワーク不使用が原則）
- **JavaScript**: Vanilla JavaScript（jQueryなし、ES6+）
- **PHP**: 必要に応じて使用

---

## 全般的なルール

### 文字コード・改行・インデント

| 項目 | 設定 |
|------|------|
| 文字コード | UTF-8（BOMなし） |
| 改行コード | LF（Unix形式） |
| インデント（HTML/PHP） | スペース4つ |
| インデント（CSS/JavaScript） | スペース2つ |

### コメント規約
- 日本語でのコメントを推奨
- 複雑な処理には必ずコメントを記述
- TODOコメントは `// TODO: 説明` の形式で記述

### 命名規則

| 対象 | 命名規則 | 例 |
|------|---------|-----|
| HTML/CSS（クラス名、ID） | ケバブケース | `my-class-name` |
| JavaScript（変数・関数） | キャメルケース | `myFunctionName` |
| JavaScript（定数） | 大文字スネークケース | `MY_CONSTANT` |
| PHP（関数・変数） | スネークケース | `my_function_name` |
| PHP（クラス） | パスカルケース | `MyClassName` |
| ファイル名 | 小文字、ハイフン区切り | `my-file-name.html` |

---

## HTML

### 必須ルール

1. **セマンティックなHTML5タグを使用**
   - `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` など
   - 意味のあるタグを選択し、`<div>` の乱用を避ける

2. **インデント**: スペース4つ

3. **属性値**: ダブルクォート（`"`）を使用

4. **自己完結型タグ**: スラッシュを付けない
   - ✅ `<br>`, `<img>`, `<input>`
   - ❌ `<br />`, `<img />`, `<input />`

5. **id/class命名**: ケバブケースで意味のある名前を付ける

6. **アクセシビリティ**:
   - `alt` 属性を必ず指定
   - `aria-label` などのARIA属性を適切に使用
   - 適切な見出し構造（h1 → h2 → h3）を維持

### 基本構造テンプレート

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
<body>
    <!-- コンテンツ -->
</body>
</html>
```

---

## CSS

### 必須ルール

1. **クラス名**: ケバブケース（`my-class-name`）

2. **プロパティ記述**: 1行に1つ

3. **インデント**: スペース2つ

4. **プロパティの順序**: 以下の順序で記述
   - **レイアウト**: `position`, `display`, `width`, `height`, `margin`, `padding` など
   - **スタイル**: `background`, `color`, `border`, `border-radius` など
   - **その他**: `transition`, `cursor`, `z-index` など

5. **モバイルファースト**: メディアクエリは `min-width` を基本とする

6. **CSS変数**: カスタムプロパティを積極的に活用

### メディアクエリの記述例

```css
/* モバイルファースト */
.element {
  width: 100%;
}

@media (min-width: 768px) {
  .element {
    width: 50%;
  }
}
```

---

## JavaScript

### 必須ルール

1. **変数宣言**:
   - `const` を優先
   - 再代入が必要な場合のみ `let` を使用
   - `var` は使用しない

2. **命名規則**:
   - 変数・関数: キャメルケース（`myVariableName`）
   - 定数: 大文字スネークケース（`MY_CONSTANT`）

3. **セミコロン**: 必ず付ける

4. **等価演算子**: 厳密等価演算子（`===`, `!==`）を使用

5. **テンプレートリテラル**: 文字列結合には積極的に使用

6. **インデント**: スペース2つ

7. **アロー関数**: `() => {}` を積極的に使用

8. **非同期処理**: `async/await` を使用（Promiseの `.then()` より優先）

### DOM操作の例

```javascript
// DOM要素の取得
const menuToggle = document.getElementById('menuToggle');
const menuItems = document.querySelectorAll('.menu-item');

// イベントリスナー
menuToggle.addEventListener('click', () => {
  menuItems.forEach((item) => {
    item.classList.toggle('active');
  });
});
```

---

## PHP

### 必須ルール

1. **開始タグ**: `<?php` を使用（短縮タグ `<?` は使用しない）

2. **終了タグ**: ファイル末尾の `?>` は省略（推奨）

3. **命名規則**:
   - 関数・変数: スネークケース（`my_function_name`）
   - クラス: パスカルケース（`MyClassName`）

4. **文字列**: シングルクォート（`'`）を優先
   - 変数展開が必要な場合のみダブルクォート（`"`）を使用

5. **インデント**: スペース4つ

---

## プロジェクト構造

### 小規模プロジェクト
1ファイルにHTML + CSS + JavaScriptをすべて含む形式。

### 中規模プロジェクト（ファイル分離）

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

### 大規模プロジェクト（コンポーネント分離）

```
project-name/
├── index.html
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── components/
    │   │   ├── header.css
    │   │   └── footer.css
    │   └── utilities.css
    ├── js/
    │   ├── main.js
    │   └── modules/
    │       ├── menu.js
    │       └── form.js
    ├── img/
    │   └── logo.png
    └── fonts/
        └── custom-font.woff2
```

### ファイル構造のルール

1. **アセットファイルは必ず `assets` フォルダ内に配置**
   - CSS、JavaScript、画像、フォントなどすべて

2. **サブフォルダで種類別に整理**
   - `css/`, `js/`, `img/`, `fonts/` など

3. **HTMLからのパス指定**
   - `assets/` を基準にパスを指定（例: `assets/css/style.css`）

---

## デザインガイドライン

### UI/UXの方針

1. **プレミアムでモダンなデザイン**を心がける

2. **タイポグラフィ**:
   - 画面幅いっぱいの巨大サイズ（Massive Scale）を恐れずに使用
   - スクロール連動やアニメーション効果（Kinetic Typography）を取り入れる
   - 画像よりも「文字」をビジュアルの主役として扱う

3. **レイアウト**:
   - 従来のグリッドにとらわれない非対称な配置（Asymmetrical/Broken Grid）を許容
   - 要素同士をあえて重ね合わせ（Overlapping）、奥行きを表現
   - 整理された情報は Bento Grid スタイルでリズムを作る

4. **マイクロインタラクション**を大切にする
   - ホバー効果、トランジション、アニメーションなど

---

## ベストプラクティス

### パフォーマンス

- 画像は適切な形式・サイズで最適化
- CSS/JavaScriptは必要最小限に
- 外部リソースの読み込みは慎重に

### セキュリティ

- ユーザー入力は必ずサニタイズ・バリデーション
- SQLインジェクション対策（プリペアドステートメント使用）
- XSS対策（エスケープ処理の徹底）

### アクセシビリティ

- 適切な見出し構造（h1 → h2 → h3）
- キーボード操作に対応
- コントラスト比を確保
- ARIA属性を適切に使用

### 保守性

- **DRY原則**（Don't Repeat Yourself）を守る
- 意味のある変数名・関数名を使用
- 適切なコメントを記述
- **既存のHTML構造・CSSクラスは可能な限り保持する（重要）**

---

## コード生成・修正時の注意事項

1. 既存のコードを修正する際は、HTML構造とCSSクラス名を可能な限り保持する
2. モバイルファーストのデザインを優先する
3. セマンティックなHTMLを使用する
4. アクセシビリティを常に考慮する
5. コメントは日本語で記述する
6. インデントは言語ごとに適切に設定する
   - HTML/PHP: 4スペース
   - CSS/JavaScript: 2スペース
7. **CSS、JavaScript、画像などのアセットファイルは必ず `assets` フォルダ内に配置する**
8. HTMLファイルからアセットを参照する際は、`assets/` を基準にパスを指定する

---

## 参考

AI（Cursor）向けの詳細なルールは以下のファイルに分割されています:

- [global.mdc](../.cursor/rules/global.mdc) - 全般的なルール
- [html.mdc](../.cursor/rules/html.mdc) - HTML固有のルール
- [css.mdc](../.cursor/rules/css.mdc) - CSS固有のルール
- [javascript.mdc](../.cursor/rules/javascript.mdc) - JavaScript固有のルール
- [php.mdc](../.cursor/rules/php.mdc) - PHP固有のルール
- [directories.mdc](../.cursor/rules/directories.mdc) - プロジェクト構造ルール
- [design.mdc](../.cursor/rules/design.mdc) - デザインガイドライン
