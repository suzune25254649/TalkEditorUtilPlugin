echo off
setlocal enabledelayedexpansion
echo -----------------------------------------------------------------------
echo aviutl.exe���A�����Ƀh���b�O�C������Enter�������Ăˁ�
echo -----------------------------------------------------------------------
set /p PATH_AVIUTL=">> "
echo.

for %%I IN ( %PATH_AVIUTL% ) do set "EXENAME=%%~nxI"
for %%I IN ( %PATH_AVIUTL% ) do set "DIRNAME=%%~dpI"

if /i aviutl.exe neq %EXENAME% (
	echo Error: �h���b�O�C�����ꂽ�t�@�C�����Aaviutl.exe�ł͂���܂���B
	echo.
	pause
	exit /b 1
)

mkdir download > NUL 2>&1
echo TalkEditorUtil�̃_�E�����[�h���J�n
if not exist .\download\TalkEditorUtil_v1.1.1.zip @bitsadmin /transfer TalkEditorUtil�̃_�E�����[�h /PRIORITY FOREGROUND https://github.com/suzune25254649/TalkEditorUtil/releases/download/v1.1.1/TalkEditorUtil_v1.1.1.zip %~dp0\download\TalkEditorUtil_v1.1.1.zip
if not exist .\download\TalkEditorUtil_v1.1.1.zip @bitsadmin /transfer TalkEditorUtil�̃_�E�����[�h /PRIORITY FOREGROUND https://github.com/suzune25254649/TalkEditorUtil/releases/download/v1.1.1/TalkEditorUtil_v1.1.1.zip %~dp0\download\TalkEditorUtil_v1.1.1.zip

if not exist .\download\TalkEditorUtil_v1.1.1.zip (
	echo ERROR
	echo �_�E�����[�h�Ɏ��s���܂����B
	echo ���X���s���邱�Ƃ�����悤�Ȃ̂ŁA���x������Ă݂Ă��������B
	pause
	exit
)
if exist .\download\TalkEditorUtil rmdir /s /q .\download\TalkEditorUtil
powershell -NoProfile -ExecutionPolicy Unrestricted .\tools\unzip.ps1 download\TalkEditorUtil_v1.1.1.zip download


mkdir %DIRNAME%\TalkEditorUtil > NUL 2>&1
mkdir %DIRNAME%\TalkEditorUtil\dropfiles > NUL 2>&1
xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.auf %DIRNAME%
xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.dll %DIRNAME%
xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.exa %DIRNAME%\TalkEditorUtil\dropfiles
xcopy /Y /E /Q download\TalkEditorUtil\tools\macro\RemoteTalkEditor*.exe %DIRNAME%\TalkEditorUtil\
xcopy /Y /E /Q download\TalkEditorUtil\tools\macro\*.dll %DIRNAME%\TalkEditorUtil\

mkdir config > NUL 2>&1
xcopy /Y /E /Q download\TalkEditorUtil\config\* config

echo SUCCEEDED
echo �Z�b�g�A�b�v������Ɋ������܂����I
pause
exit