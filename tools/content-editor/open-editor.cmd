@echo off
rem Double-click to open the portfolio content editor.
cd /d "%~dp0..\.."
node tools\content-editor\server.mjs
if errorlevel 1 pause
