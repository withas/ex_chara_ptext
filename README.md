# ex_chara_ptext
- ティラノスクリプト用のプラグインです。`[chara_ptext]`タグ（`#`）の動作を変更します。
- `[chara_config]`タグで*talk_focus*や*talk_anim*を有効にしている場合に複数人のキャラクターを同時に喋らせることが可能になります。

## 【導入方法】
1. 導入したいゲームプロジェクトの"/data/others/plugin/"フォルダにex_chara_ptextフォルダを作り、このリポジトリのファイルを置いてください。
2. first.ksの最初に`[plugin name="ex_chara_ptext" color="0xFFFFFF"]`のように書いて読み込ませてください。colorパラメータにはキャラクター名を表示するときのデフォルトの色を指定します。指定しない場合は0xFFFFFFになります。

## 【使い方】
- 複数人のキャラクターに喋らせたいときは`#`の後にキャラクターのnameを半角の&で繋げて書きます。（例：`#akane&yamato`）
- `[chara_new]`で定義していないキャラクターの名前を指定することもできます。（例：`#akane&たかし`）
- **複数人のキャラクターを指定した場合*face*パラメータを指定することはできません。**

## 【免責事項】
- このプラグインを利用したことによって損害・不利益・事故等が発生した場合でも、一切の責任を負いません。