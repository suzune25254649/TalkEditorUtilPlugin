# ダウンロードの仕方
このWebページの右側にReleasesという項目があるので、そこから行ける先で最新のZipをダウンロードしてください。

# 対応aviutlバージョン
- aviutl1.10 + 拡張編集0.92
- aviutl1.10 + 拡張編集0.93rc1

にのみ対応しております。  

# 規約
このツール、またはこのツールに含まれるファイルを使用して作った動画を公開する場合
* ニコニコ動画で公開するなら  
コンテンツツリーの親作品に、下記動画を登録してください。  
* 他のサイトで公開するなら  
動画説明欄などに、下記動画へのリンクを掲載してください。

動画URL：https://www.nicovideo.jp/watch/sm39460313

手間なのは承知しておりますが、このツールを多くの動画製作者に周知し、楽をしていただくためとなります。よろしくお願いいたします。

# このツールが解決する「面倒ごと」
* 各種トークソフトで作った音声ファイルや字幕を、いちいちaviutlに設置するのが面倒。
* 動画編集中に、aviutl以外のソフトを触るのが面倒。
* 多目的スライダーの範囲外に出ると、立ち絵の表情が戻ってしまうので、多目的スライダーオブジェクトをいちいち延長するのが面倒。

# どう解消するのか
* aviutl上でセリフを作れば、字幕や音声などを自動で設置してくれるようにします。
* 仮想延長(多目的スライダー)を使うと、自動延長がなされます。

# 参考動画
ツール解説動画  
https://www.nicovideo.jp/watch/sm39460313

# セットアップする
setup.batを起動すると、aviutlのインストール先を聞いてきます。  
エクスプローラーから aviutl.exe をドラッグ＆ドロップし、Enterを押してください。

***また、別途PSDToolKitを導入してください。***

# 使うための準備
1. aviutlでプロジェクトを作成し、プロジェクトを保存します。
1. プロジェクトファイルと同じフォルダに、configフォルダをコピーする。
1. 利用したいトークソフトを起動しておきます。

- **※SofTalkはver1.93.50以降を使ってください。**  
- **※CeVIO CS6は非対応です。7にアップデートしましょう。**
- **※VOICEROID2は 32bit, 64bit両対応ですが、64bit版を導入するのをお勧めします。**

# 注意点
バージョンアップ版がリリースされているかについて、githubに通信をして確認するため、起動時に通信許可を求めるポップアップが出現することがあります。

# 使ってみる
拡張編集のタイムライン上で、F4キーを押すとテキストオブジェクトが配置されます。  
テキストの内容は下記の通りです。
```
<?s=[==[

]==];require("PSDToolKit").subtitle:set(require("TalkEditorUtil").f(s),obj,true);s=nil--??>
```
テキストを編集して、しゃべらせてみましょう。

1行目がプリセット名になります。  
2行目以降がセリフ内容です。
```
<?s=[==[
琴葉 茜 - 通常
字幕一行目やで
二行目やで。三行目以降ももちろん書けるんやで
]==];require("PSDToolKit").subtitle:set(require("TalkEditorUtil").f(s),obj,true);s=nil--??>
```

F5キーを押すとセリフをしゃべります。  
対応するトークソフトを先に起動しておいてください。

F7キーを押すと音声ファイルが生成された上で
* 音声ファイルオブジェクトや、多目的スライダーオブジェクトなどが配置される
* テキストオブジェクトの長さが、音声ファイルオブジェクトの長さに揃えられる
* 編集フレームが、音声ファイルオブジェクトの1フレーム後ろに移動する  
※ただし、音声ファイルが動画の末尾に接している場合、1フレーム後ろに移動 ***できません。***  
　先に動画の時間を十分長くしておいてください。

という処理が行われます。

これにより、続けてF4キーで次のセリフを作成することで、隙間なく会話を並べていくことができます。

# ショートカットキー

※F3～SHIFT+F10のキー設定は、config/keyconfig.txt を編集することで変更できます。

|キー|効果|
|----|----|
|F3|マウスカーソルの位置に、オブジェクトを配置する。|
|F4|現在の編集フレーム、かつマウスカーソルがあっているレイヤーに、オブジェクトを配置する。|
|F5|トークソフトでしゃべらせる。|
|F6|しゃべっているのを止める。|
|F7|セリフをWav出力し、音声オブジェクトなどをタイムラインに自動配置する。|
|F8|Wavを新たに出力せずに配置する。<br>F7キーでWav出力した後、配置に失敗する場合があります。（配置先に既にオブジェクトがある場合）<br>失敗原因を解決した後に、再度Wav出力するのは無駄なので、F8キーではWav出力を省略して配置のみ行います。|
|F10|編集対象を、1つ次の、多目的スライダーを持つオブジェクトに移動させる。|
|SHIFT+F10|編集対象を、1つ前の、多目的スライダーを持つオブジェクトに移動させる。|
|CTRL+A|テキストボックスでのみ有効。プリセット名とセリフの範囲を、選択状態にする。|
|TAB|テキストボックスでのみ有効。多目的スライダーの数値入力部にフォーカスを移す。|

# その他機能

## レイヤー名を使い、プリセット名を省略する
```
琴葉 茜 - 通常
```
と毎回打ち込むのはしんどいので、省略することができます。

プリセット名は「レイヤー名」＋「1行目の記述」で構成されるようになっています。

レイヤー名を"琴葉 茜 - "にした上で
```
<?s=[==[
通常
一行目やで
二行目やで。三行目以降ももちろん書けるんやで
]==];require("PSDToolKit").subtitle:set(require("TalkEditorUtil").f(s),obj,true);s=nil--??>
```
とすることができます。

* 半角スペースの有無に注意してください。
* aviutlの仕様として「レイヤーに1つもオブジェクトが配置されていない」場合、プロジェクト保存時にレイヤー名を保存してくれないことに注意してください。

## 空白除去

セリフに出てくる空白は、トークソフト上では除去され、字幕には反映されます。

```
ボクは お兄ちゃんが 大好きだよ
```
と記述すれば、字幕には空白が入って見やすくなりつつ、トークソフト上では空白が除去されるので不要な休符が入りません。

## aviutlタグ
\<s32\>といったaviutlタグはそのまま使えます。  
トークエディタは、読み上げやWav出力の際にタグを無視します。

## 特殊記法

特殊記法を使うと、トークソフトに渡すテキストと、字幕にするテキストの内容を分けることができます。

| の前がトークソフト用、後ろが字幕用となります。

|特殊記法|トークソフト|字幕|
|----|----|----|
|{マスター\|ご主人様}|マスター|ご主人様|
|{？}|？|※出力なし|
|{\|？}|※出力なし|？|

※字幕にどうしても{}記号を使いたい場合は、{の代わりに{{と、}の代わりに}}と記述してください。

## 不要記号除去

！？!?が連続する場合、トークソフト上では不要な記号を削除します。

|記述例|トークソフト|字幕|
|----|----|----|
|そんな！？|そんな？|そんな！？|
|え！！？！？|え？|え！！？！？|
|いくぞ！！|いくぞ！|いくぞ！！|

「」『』【】（）()[]が文末にある場合、トークソフト上では不要なので削除します。  
字幕には残ります。

## プリセット名などを変更する

configフォルダにある、txtファイルを編集します。  
詳細は各テキストファイルに書かれています。

|ファイル名|機能|
|----|----|
|talkers.txt|プリセット名を見て、どのトークソフトで再生とWav生成を行なうかを決めるファイル。|
|presets.txt|プリセット名と、その声設定を定義するファイル。<br>※VOICEROID2以降のボイロ系や、GynoidTalkのプリセットは、ここの設定は参照しません。|
|addsilence.txt|各トークソフトごとに、終末ポーズ（末尾無音）を足す設定をするファイルです。

## 設定＞TalkEditorUtilの設定 で設定を変える

|項目名|説明|
|----|----|
|ずらし数|オブジェクトを自動配置する場合に、テキストオブジェクトから何レイヤーずらして配置するか。|
|口パク準備を生成|デフォルトでOFF。<br>口パク準備オブジェクトを生成するかどうか。|
|多目的スライダーを生成|デフォルトでOFF。<br>多目的スライダーオブジェクトを生成するかどうか。|
|統合オブジェクトを使用する|デフォルトでON。<br>F3やF4で生成されるテキストオブジェクトに、口パク準備と多目的スライダー2つを追加される。|

《動作例》  
* ずらし数：3
* 口パク準備を生成：ON
* 多目的スライダーを生成：ON
* 統合オブジェクトを使用する：OFF


Layer5にテキストオブジェクトを配置し、F7キーで出力すると  
* Layer8に音声ファイルオブジェクト  
* Layer11に口パク準備オブジェクト
* Layer14に多目的スライダーオブジェクト

が設置されます。

## F3, F4で生成されるオブジェクトを変更する

aviutlフォルダの、"TalkEditorUtil/dropfiles/字幕準備.exa"、"TalkEditorUtil/dropfiles/統合.exa"をすり替えてください。  

## 仮想延長(多目的スライダー)を使用する

タイムラインで右クリック ＞ メディアオブジェクトの追加 ＞ TalkEditorUtil ＞ 仮想延長(多目的スライダー)

にて配置できます。

配置した範囲で、かつレイヤー番号がより若い範囲にある全ての「多目的スライダー」を自動で延長します。  
※タイムライン上の見た目に変化はありません。

詳しい挙動、使い方はこちらの動画から確認してください。

動画：https://www.nicovideo.jp/watch/sm39871405


# 現在の対応トークソフト
* A.I.VOICE
* VOICEROID2(64bit版)
* VOICEROID2(32bit版)
* GynoidTalk
* CeVIO CS7(IA, ONE, さとうささら, すずきつづみ, タカハシ)
* CeVIO AI(IA, ONE, 小春六花, 弦巻マキ (日), さとうささら)
* SofTalk(ver1.93.50以降)
* 音街ウナTalk Ex
* VOICEROID＋ 民安ともえ EX
* VOICEROID＋ 京町セイカ EX
* VOICEROID＋ 東北ずん子 EX
* VOICEROID＋ 東北きりたん EX
* おそらく他のVOICEROID＋ EX系も動くはず
* VOICEVOX
* CoeFont.CLOUD
* COEIROINK on VOICEVOX
* 棒読みちゃん
* TALQu

# 既知のバグ
* CeVIOでWav出力する際、設定されているポーズ長が反映されない。結果、「、」も「。」も同じ長さの休符となる。  
→ CeVIO公式に不具合として報告したところ、改善すべき点として受け入れていただけたようです。しばらく待ちましょう。

# バグ報告
https://twitter.com/suzune25254649

こちらまで、DMやリプで報告をくださると凄く喜びます。（バグはなるべく直したい）

# 断り書き
このツールは規約を守る範囲で自由にお使いください。  
ただし、このツールを利用した際に発生した いかなる損失や損害が発生についても、作者は一切の責任を負いかねます。

# 更新履歴

## v1.13
- 以下は連携しているTalkEditorUtilのVerUPによる更新です
    - 棒読みちゃんに対応
    - TALQuに対応

## v1.12
- アップデート告知ダイアログで、ダウンロードページをブラウザで開くことができるようになりました。
- 追記：同v1.12にて差し換えを行ないました。Friendly系のDLLを同梱するのではなく、nuget経由で公式からダウンロード取得するようにしました。
- 以下は連携しているTalkEditorUtilのVerUPによる更新です
    - COEIROINK on VOICEVOX に対応。
    - A.I.VOICE ver1.3.0.1に対応。（1.3.0.0やそれ以前でも動きます）

## v1.11
- 音声オブジェクト設置時に字幕オブジェクトが延長される場合に、重なるオブジェクトが既に存在する場合におかしな表示になってしまうバグを修正。
- 半角スペースが含まれていると、セットアップに失敗してしまうバグを修正。
- 日本語ファイル名を正しく解凍できない解凍ツールだと、使用時にうまく動かなくなる問題を修正。

- 以下は連携しているTalkEditorUtilのVerUPによる更新です
    - A.I.VOICE、VOICEROID2、GynoidTalk、Voiceroid+Ex、音街ウナTalk Exの音声保存時に、保存ダイアログが出ないようになり、保存ミスが起きないようになりました。
    - トークソフトで文末に「」『』【】（）()[]の記号があると、文末ポーズが二重に付与されてしまうパターンがあるため、省略するようにしました。

## v1.10
- 仮想延長(多目的スライダー)の挙動について。多目的スライダーに補間スクリプトが指定されていると、右側の数値を参照してしまうため、期待されている動作にならない問題を修正。補間スクリプトが指定されていても、左側の数値を参照するようにしました。

## v1.09
- 仮想延長(多目的スライダー)の挙動について。1つのレイヤーにスライダーフィルタが複数あった場合、2つ目以降のスライダーフィルタが延長されていなかった問題を修正しました。

## v1.08
- 仮想延長(多目的スライダー)を追加しました。
- 英語版aviutlでも動作するようにしました。
- 以下は連携しているTalkEditorUtilのVerUPによる更新です
    - CoeFont.CLOUDで動かなくなっていたのを修正。
    - CoeFont.CLOUDで「前回と同じ設定、同じセリフ」を再生する際に、ポイントが減らないようキャッシュするようにしました。

## v1.07
- 拡張編集0.93rc1に対応しました。
- キーコンフィグ機能を追加しました。config/keyconfig.txt を編集してください。
- テキストボックス内でTABキーを押すと、多目的スライダーの数値部にフォーカスが移動するようにしました。セリフを入力し終えたらTABを押し、表情設定にスムーズに移ることができます。
- 起動時に自動的にバージョンアップチェックを行うようになりました。
- 以下は連携しているTalkEditorUtilのVerUPによる更新です
    - VOICEVOXに対応。
    - CoeFont.CLOUDに対応。
    - 起動時に自動的にバージョンアップチェックを行うようになりました。

## v1.06
- GoogleIMEやATOKだと、文字入力中にカタカナ変換のためにF7を押した際、Wavファイル生成もしてしまう問題を修正しました。
- オプションに「統合オブジェクトを使用する」を追加しました。  
F3やF4で生成するj字幕オブジェクトを、統合オブジェクト（口パク準備、多目的スライダーを含んだもの）に変更します。
- F10で「次の多目的スライダーを持つオブジェクト」を選択状態にします。  
SHIFT+F10で「前の～」を選択状態にします。  
またその際、多目的スライダーの1つ目の数字入力欄にフォーカスを合わせてくれます。
- オブジェクトの編集ダイアログの数字入力欄で、上下キーを押すと+-1ずつ変更してくれるようにしました。PAGEUP, PAGEDOWNキーを押すと+-10ずつ変更してくれるようにしました。
- その他細かいバグの修正。

- 以下は連携しているTalkEditorUtilのVerUPによる更新です
    - CeVIO AIの弦巻マキ (日)に対応。
    - GoogleIME利用時に、Voiceroid2、A.I.VOICE、Gynoidトークにてファイル保存がうまくいかない場合があった問題を修正
    - CeVIO AIのバージョンアップにより、ONEの名前がOИEに変更されて動かなくなったことへの対応。ONEでもOИEでの動くようにしてあります。
    - CeVIO AIのさとうささら、IAが正しく動かないことがあったので修正。

## v1.05
- 32bit VOICEROID2や、ガイノイドで音声ファイルを出力した後、プラグインが反応しなくなるバグを修正。
- F7やF8で動画時間が延長された際に、編集フレームが「音声ファイルの末尾あｋら1フレーム次の位置」に正しく移動しなかったバグを修正。動画時間を1フレーム延長して、正しい位置に移動するようにしました。
- setup.batでインストールする際、拡張編集がpluginsフォルダの中にインストールされている場合に、正しくインストールされなかったバグを修正。
- setup.batでインストールする際、インストール先に半角スペースが含まれているとうまくいかなかったバグを修正。
- setup.batで上書きインストールする際、正しくインストールできてもエラーとなってしまうことがあるバグを修正。


## v1.04
- VFR->CFRがONで、可変フレームレート動画を読み込んだプロジェクトにて、音声ファイルの長さがおかしくなる問題を修正。
- setup.batで失敗した際に、エラーメッセージが正しくでなかった問題を修正。

## v1.03
- setup.batで失敗した際に、エラーメッセージを表示するようにしました。
- config/talkers.txt にAIVoiceEditorを追加。
- A.I.VOICEに対応しました。
- 一部環境で、ボイスロイド系のWav出力に失敗するバグを修正しました。
- ボイス出力に失敗した際に、ツールがフリーズしてしまう問題を修正しました。

## v1.02
- さとうささら、すずきつづみ、タカハシが使えるように対応しました。
- 一部環境で、ボイスロイド系のWav出力に失敗するバグを修正しました。
- 特殊記法の {{記法、 }}記法がうまく動いていなかったバグを修正しました。
- ライセンス表記が足りていなかったのを修正しました。

## v1.01
- プロジェクトファイル名に、特定の文字が含まれている場合に誤動作する問題を修正しました。

# ライセンス
* AviUtlPluginSDK License

The MIT License

Copyright (c) 1999-2012 Kenkun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

* Lua License
-----------

Lua is licensed under the terms of the MIT license reproduced below.
This means that Lua is free software and can be used for both academic
and commercial purposes at absolutely no cost.

For details and rationale, see http://www.lua.org/license.html .

===============================================================================

Copyright (C) 1994-2012 Lua.org, PUC-Rio.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

===============================================================================
