@echo off
setlocal enabledelayedexpansion
echo -----------------------------------------------------------------------
echo aviutl.exe���A�����Ƀh���b�O�C������Enter�������Ăˁ�
echo -----------------------------------------------------------------------
set /p PATH_AVIUTL=">> "
echo.

call cscript tools\setup.js //NoLogo %PATH_AVIUTL%
if 0 equ %errorlevel% (
	echo SUCCEEDED
	echo �Z�b�g�A�b�v������Ɋ������܂����I
)
pause
exit /b %errorlevel%
