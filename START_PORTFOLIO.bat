@echo off
title Abdul Rafey Portfolio Launcher
echo ========================================================
echo   Launching Abdul Rafey - 3D Cinematic Portfolio...
echo   Qarshi University, Lahore - Roll: 24L-0043
echo ========================================================
echo.
cd /d "%~dp0"
echo Starting development server and opening your browser...
npm run dev -- --open
pause
