@echo off
setlocal enabledelayedexpansion
echo -----------------------------------------------------------------------
echo aviutl.exeを、ここにドラッグインしてEnterを押してね♪
echo -----------------------------------------------------------------------
set /p PATH_AVIUTL=">> "
echo.

call cscript tools\setup.js //NoLogo %PATH_AVIUTL%
if 0 equ %errorlevel% (
	echo SUCCEEDED
	echo セットアップが正常に完了しました！
)
pause
exit /b %errorlevel%
