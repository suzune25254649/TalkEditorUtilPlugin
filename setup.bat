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
if not exist .\download\TalkEditorUtil_v1.1.2.zip @bitsadmin /transfer TalkEditorUtil�̃_�E�����[�h /PRIORITY FOREGROUND https://github.com/suzune25254649/TalkEditorUtil/releases/download/v1.1.2/TalkEditorUtil_v1.1.2.zip %~dp0\download\TalkEditorUtil_v1.1.2.zip
if not exist .\download\TalkEditorUtil_v1.1.2.zip @bitsadmin /transfer TalkEditorUtil�̃_�E�����[�h /PRIORITY FOREGROUND https://github.com/suzune25254649/TalkEditorUtil/releases/download/v1.1.2/TalkEditorUtil_v1.1.2.zip %~dp0\download\TalkEditorUtil_v1.1.2.zip

if not exist .\download\TalkEditorUtil_v1.1.2.zip (
	echo ERROR
	echo �_�E�����[�h�Ɏ��s���܂����B
	echo ���X���s���邱�Ƃ�����悤�Ȃ̂ŁA���x������Ă݂Ă��������B
	pause
	exit
)
if exist .\download\TalkEditorUtil rmdir /s /q .\download\TalkEditorUtil
powershell -NoProfile -ExecutionPolicy Unrestricted .\tools\unzip.ps1 download\TalkEditorUtil_v1.1.2.zip download

set err=0

mkdir %DIRNAME%\TalkEditorUtil > NUL 2>&1
if %ERRORLEVEL% neq 0 (set err=1)

mkdir %DIRNAME%\TalkEditorUtil\dropfiles > NUL 2>&1
if %ERRORLEVEL% neq 0 (set err=1)

xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.auf %DIRNAME%
if %ERRORLEVEL% neq 0 (set err=1)

xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.dll %DIRNAME%
if %ERRORLEVEL% neq 0 (set err=1)

xcopy /Y /Q tools\aviutl_plugin\TalkEditorUtil.exa %DIRNAME%\TalkEditorUtil\dropfiles
if %ERRORLEVEL% neq 0 (set err=1)

xcopy /Y /E /Q download\TalkEditorUtil\tools\macro\RemoteTalkEditor*.exe %DIRNAME%\TalkEditorUtil\
if %ERRORLEVEL% neq 0 (set err=1)

xcopy /Y /E /Q download\TalkEditorUtil\tools\macro\*.dll %DIRNAME%\TalkEditorUtil\
if %ERRORLEVEL% neq 0 (set err=1)

mkdir config > NUL 2>&1
xcopy /Y /E /Q download\TalkEditorUtil\config\* config
if %ERRORLEVEL% neq 0 (set err=1)

echo;

if %err% neq 0 (
	echo FAILED
	echo �Z�b�g�A�b�v�Ɏ��s���܂����B
	echo ���L��Ή��̌�A������x���������������B�i����ł��_���Ȃ�PC�ċN�����j
	echo �Eaviutl��S�ďI�����Ă��������B
	echo �E�g���Ă���Voiceoid2�AA.I.VOICE�A�K�C�m�C�h�̃G�f�B�^��S�ĕ��Ă�������
	echo �ERemoteTalkEditor64���I�����Ă��������i�^�X�N�g���C�Ɏc���Ă��܂��񂩁H�j
	echo;
	pause
	exit
	
)

echo SUCCEEDED
echo �Z�b�g�A�b�v������Ɋ������܂����I
echo;
pause
exit