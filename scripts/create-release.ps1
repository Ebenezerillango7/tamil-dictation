# PowerShell Tag & Publish Release Helper
# Creates a Git tag and pushes it to trigger GitHub Actions Release workflow

param (
    [string]$Version = ""
)

$ErrorActionPreference = "Stop"

Write-Host "=== 🚀 Tamil Dictation Release Publisher ===" -ForegroundColor Cyan

if (-not $Version) {
    $Version = Read-Host "`nEnter release version tag (e.g. v1.0.0)"
}

if (-not $Version) {
    Write-Host "❌ Error: Version tag is required (e.g. v1.0.0)" -ForegroundColor Red
    exit 1
}

# Ensure tag starts with 'v'
if (-not $Version.StartsWith("v")) {
    $Version = "v$Version"
}

Write-Host "`n1. Creating tag $Version..." -ForegroundColor Yellow
git tag -a "$Version" -m "Release $Version"

Write-Host "2. Pushing tag $Version to GitHub origin..." -ForegroundColor Yellow
git push origin "$Version"

Write-Host "`n✅ Tag $Version pushed successfully!" -ForegroundColor Green
Write-Host "The GitHub Actions 'Publish Release' workflow has been triggered automatically." -ForegroundColor Cyan
Write-Host "View release build progress here:" -ForegroundColor Yellow
Write-Host "https://github.com/Ebenezerillango7/tamil-dictation/actions" -ForegroundColor White
