# PowerShell Tag & Publish Release Helper
# Creates a Git tag and pushes it to trigger GitHub Actions Release workflow

param (
    [string]$Version = ""
)

Write-Host "=== [RELEASE] Tamil Dictation Release Publisher ===" -ForegroundColor Cyan

if (-not $Version) {
    $Version = Read-Host "`nEnter release version tag (e.g. v1.0.0)"
}

if (-not $Version) {
    Write-Host "[ERROR] Version tag is required (e.g. v1.0.0)" -ForegroundColor Red
    exit 1
}

# Ensure tag starts with 'v'
if (-not $Version.StartsWith("v")) {
    $Version = "v$Version"
}

Write-Host "`n[1/2] Creating Git tag $Version..." -ForegroundColor Yellow
git tag -a "$Version" -m "Release $Version"

Write-Host "[2/2] Pushing tag $Version to GitHub origin..." -ForegroundColor Yellow
git push origin "$Version"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Tag $Version pushed to GitHub!" -ForegroundColor Green
    Write-Host "GitHub Actions 'Publish Release' workflow is now running." -ForegroundColor Cyan
    Write-Host "Track workflow progress at:" -ForegroundColor Yellow
    Write-Host "https://github.com/Ebenezerillango7/tamil-dictation/actions" -ForegroundColor White
} else {
    Write-Host "`n[ERROR] Failed to push tag $Version to origin." -ForegroundColor Red
}
