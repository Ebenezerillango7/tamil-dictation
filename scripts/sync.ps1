# PowerShell Git Sync Helper
# Pulls, Stages, Commits, and Pushes to GitHub

param (
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

Write-Host "=== 🔄 Tamil Dictation Git Sync ===" -ForegroundColor Cyan

# 1. Pull latest changes safely
Write-Host "`n1. Pulling latest updates from origin/main..." -ForegroundColor Yellow
try {
    git pull --rebase --autostash origin main
    Write-Host "✓ Pulled and synchronized." -ForegroundColor Green
} catch {
    Write-Host "⚠️ Warning during pull. Continuing..." -ForegroundColor DarkYellow
}

# 2. Stage changes
Write-Host "`n2. Staging all modified files..." -ForegroundColor Yellow
git add -A

# 3. Check status
$status = git status --porcelain
if (-not $status) {
    Write-Host "✓ Working tree is clean. Nothing new to commit." -ForegroundColor Green
    exit 0
}

# 4. Get commit message if not passed
if (-not $Message) {
    $Message = Read-Host "`nEnter commit message"
}

if (-not $Message) {
    $Message = "Update Tamil Dictation project files"
}

# 5. Commit
Write-Host "`n3. Committing changes: '$Message'..." -ForegroundColor Yellow
git commit -m "$Message"

# 6. Push
Write-Host "`n4. Pushing to origin/main..." -ForegroundColor Yellow
git push origin main

Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "GitHub Repo: https://github.com/Ebenezerillango7/tamil-dictation" -ForegroundColor Cyan
