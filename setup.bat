echo off
setlocal enabledelayedexpansion
echo -----------------------------------------------------------------------
echo aviutl.exeを、ここにドラッグインしてEnterを押してね♪
echo -----------------------------------------------------------------------
set /p PATH_AVIUTL=">> "
echo.

for %%I IN ( %PATH_AVIUTL% ) do set "EXENAME=%%~nxI"
for %%I IN ( %PATH_AVIUTL% ) do set "DIRNAME=%%~dpI"

if /i aviutl.exe neq %EXENAME% (
	echo Error: ドラッグインされたファイルが、aviutl.exeではありません。
	echo.
	pause
	exit /b 1
)

mkdir download > NUL 2>&1
echo TalkEditorUtilのダウンロードを開始
if not exist .\download\TalkEditorUtil_v1.1.3.zip @bitsadmin /transfer TalkEditorUtilのダウンロード /PRIORITY FOREGROUND https://github.com/suzune25254649/TalkEditorUtil/releases/download/v1.1.3/TalkEditorUtil_v1.1.3.zip %~dp0\download\TalkEditorUtil_v1.1.3.zip
if not exist .\download\TalkEditorUtil_v1.1.3.zip @bitsadmin /transfer TalkEditorUtilのダウンロード /PRIORITY FOREGROUND https://github.com/suzune25254649/TalkEditorUtil/releases/download/v1.1.3/TalkEditorUtil_v1.1.3.zip %~dp0\download\TalkEditorUtil_v1.1.3.zip

if not exist .\download\TalkEditorUtil_v1.1.3.zip (
	echo ERROR
	echo ダウンロードに失敗しました。
	echo 時々失敗することがあるようなので、何度かやってみてください。
	echo;
	pause
	exit /b 1
)
if exist .\download\TalkEditorUtil rmdir /s /q .\download\TalkEditorUtil
powershell -NoProfile -ExecutionPolicy Unrestricted .\tools\unzip.ps1 download\TalkEditorUtil_v1.1.3.zip download

if exist "%DIRNAME%exedit.auf" (
	echo "%DIRNAME%"にインストールします。
) else if exist "%DIRNAME%plugins\exedit.auf" (
	set DIRNAME=%DIRNAME%plugins\
	echo "!DIRNAME!"にインストールします。
) else (
	echo 拡張編集プラグインである exedit.auf が見当たりません。
	echo 拡張編集0.92を導入してください（0.93は非対応です）
	echo;
	pause
	exit /b 1
)

mkdir "%DIRNAME%\TalkEditorUtil" > NUL 2>&1
mkdir "%DIRNAME%\TalkEditorUtil\dropfiles" > NUL 2>&1
mkdir "config" > NUL 2>&1

set err=0

xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.auf "%DIRNAME%"
if %ERRORLEVEL% neq 0 (set err=1)

xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.dll "%DIRNAME%"
if %ERRORLEVEL% neq 0 (set err=2)

xcopy /Y /Q tools\aviutl_plugin\*.exa "%DIRNAME%\TalkEditorUtil\dropfiles"
if %ERRORLEVEL% neq 0 (set err=3)

xcopy /Y /E /Q download\TalkEditorUtil\tools\macro\RemoteTalkEditor*.exe "%DIRNAME%\TalkEditorUtil\"
if %ERRORLEVEL% neq 0 (set err=4)

xcopy /Y /E /Q download\TalkEditorUtil\tools\macro\*.dll "%DIRNAME%\TalkEditorUtil\"
if %ERRORLEVEL% neq 0 (set err=5)

xcopy /Y /E /Q download\TalkEditorUtil\config\* "config"
if %ERRORLEVEL% neq 0 (set err=6)

if %err% neq 0 (
	echo FAILED
	echo セットアップに失敗しました。
	echo 下記を対応の後、もう一度お試しください（それでもダメならPC再起動を）
	echo ・aviutlを全て終了してください。
	echo ・使っていたVoiceoid2、A.I.VOICE、ガイノイドのエディタを全て閉じてください
	echo ・RemoteTalkEditor64を終了してください（タスクトレイに残っていませんか？）
	echo;
	pause
	exit /b 1
)

echo SUCCEEDED
echo セットアップが正常に完了しました！
echo;
pause
