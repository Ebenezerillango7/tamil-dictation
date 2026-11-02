@echo off
REM Windows batch wrapper to bypass PowerShell ExecutionPolicy
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0create-release.ps1" %*
