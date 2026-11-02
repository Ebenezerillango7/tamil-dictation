# PowerShell Script: Publish issues via GitHub REST API

param (
    [string]$Token = $env:GITHUB_TOKEN
)

$ErrorActionPreference = "Stop"

if (-not $Token) {
    Write-Host "Please provide your GitHub Personal Access Token (PAT)." -ForegroundColor Yellow
    Write-Host "You can generate one with 'repo' scope at: https://github.com/settings/tokens" -ForegroundColor DarkGray
    $Token = Read-Host "Enter GitHub Token"
}

if (-not $Token) {
    Write-Host "Error: GitHub Token is required to call the GitHub REST API." -ForegroundColor Red
    exit 1
}

$repoOwner = "Ebenezerillango7"
$repoName  = "tamil-dictation"
$apiUrl    = "https://api.github.com/repos/$repoOwner/$repoName/issues"

$headers = @{
    "Authorization"        = "Bearer $Token"
    "Accept"               = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
    "User-Agent"           = "PowerShell-TamilDictation-Setup"
}

$issueFiles = @(
    @{
        Title  = "🗣️ Tamil Dialect Speech Recognition & Translation to Text"
        Path   = ".github/issues/01-tamil-dialect-speech-recognition.md"
        Labels = @("feature", "speech-engine", "dialect")
    },
    @{
        Title  = "🎨 Interactive Mode UI/UX with Real-Time Audio Visualizer"
        Path   = ".github/issues/02-interactive-ui-ux-mode.md"
        Labels = @("enhancement", "ui/ux", "visualizer")
    },
    @{
        Title  = "🎙️ Audio Recording & File Upload Processing Pipeline"
        Path   = ".github/issues/03-audio-record-and-upload.md"
        Labels = @("feature", "audio-processing", "file-upload")
    },
    @{
        Title  = "📝 Dedicated Below Output Window with Full Manual Text Editing"
        Path   = ".github/issues/04-below-output-window-editable.md"
        Labels = @("feature", "editor", "export")
    },
    @{
        Title  = "🚀 Automated CI/CD, GitHub Pages Deployment & Release Publishing"
        Path   = ".github/issues/05-cicd-deployment-publishing.md"
        Labels = @("ci/cd", "automation", "devops")
    }
)

Write-Host "=== 🚀 Publishing Issues to $repoOwner/$repoName via GitHub API ===" -ForegroundColor Cyan

foreach ($issue in $issueFiles) {
    $bodyContent = ""
    if (Test-Path $issue.Path) {
        $bodyContent = Get-Content $issue.Path -Raw
    } else {
        $bodyContent = $issue.Title
    }

    $payload = @{
        title  = $issue.Title
        body   = $bodyContent
        labels = $issue.Labels
    } | ConvertTo-Json -Depth 5

    Write-Host "`nCreating: $($issue.Title)..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $payload -ContentType "application/json; charset=utf-8"
        Write-Host "✓ Created Issue #$($response.number): $($response.html_url)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nAll issues processing finished!" -ForegroundColor Cyan

