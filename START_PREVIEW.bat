@echo off
title Abdul Rafey Portfolio Production Preview
echo ========================================================
echo   Launching Abdul Rafey - Production Build Preview...
echo ========================================================
echo.
cd /d "%~dp0"
echo Starting production server and opening your browser...
npm run preview -- --open
pause
