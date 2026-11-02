# PowerShell Git Sync Helper
# Pulls, Stages, Commits, and Pushes to GitHub

param (
    [string]$Message = ""
)

Write-Host "=== [SYNC] Tamil Dictation Git Sync ===" -ForegroundColor Cyan

# 1. Pull latest changes safely
Write-Host "`n[1/4] Pulling latest updates from origin/main..." -ForegroundColor Yellow
git pull --rebase --autostash origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Note: Pull completed with status code $LASTEXITCODE. Continuing..." -ForegroundColor DarkYellow
} else {
    Write-Host "[OK] Synced with origin/main." -ForegroundColor Green
}

# 2. Stage changes
Write-Host "`n[2/4] Staging modified files..." -ForegroundColor Yellow
git add -A

# 3. Check status
$status = git status --porcelain
if (-not $status) {
    Write-Host "[OK] Working tree is clean. Nothing to commit." -ForegroundColor Green
    exit 0
}

# 4. Get commit message if not passed
if (-not $Message) {
    $Message = Read-Host "`nEnter commit message"
}

if (-not $Message) {
    $Message = "Update Tamil Dictation files"
}

# 5. Commit
Write-Host "`n[3/4] Committing changes: '$Message'..." -ForegroundColor Yellow
git commit -m "$Message"

# 6. Push
Write-Host "`n[4/4] Pushing to origin/main..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host "Repository URL: https://github.com/Ebenezerillango7/tamil-dictation" -ForegroundColor Cyan
} else {
    Write-Host "`n[ERROR] Push failed with exit code $LASTEXITCODE." -ForegroundColor Red
}
