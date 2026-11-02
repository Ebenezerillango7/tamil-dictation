@echo off
REM Windows batch wrapper to publish issues via GitHub REST API
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0publish-issues-api.ps1" %*

