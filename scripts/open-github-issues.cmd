@echo off
REM Windows batch wrapper to open all GitHub issues in browser
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0open-github-issues.ps1" %*
