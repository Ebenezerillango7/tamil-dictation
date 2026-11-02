# PowerShell Helper: Open GitHub New Issue pages with pre-filled content

$repoUrl = "https://github.com/Ebenezerillango7/tamil-dictation/issues/new"

$issues = @(
    @{
        Title = "🗣️ Tamil Dialect Speech Recognition & Translation to Text"
        File  = ".github\issues\01-tamil-dialect-speech-recognition.md"
        Labels = "feature,speech-engine,dialect"
    },
    @{
        Title = "🎨 Interactive Mode UI/UX with Real-Time Audio Visualizer"
        File  = ".github\issues\02-interactive-ui-ux-mode.md"
        Labels = "enhancement,ui/ux,visualizer"
    },
    @{
        Title = "🎙️ Audio Recording & File Upload Processing Pipeline"
        File  = ".github\issues\03-audio-record-and-upload.md"
        Labels = "feature,audio-processing,file-upload"
    },
    @{
        Title = "📝 Dedicated Below Output Window with Full Manual Text Editing"
        File  = ".github\issues\04-below-output-window-editable.md"
        Labels = "feature,editor,export"
    },
    @{
        Title = "🚀 Automated CI/CD, GitHub Pages Deployment & Release Publishing"
        File  = ".github\issues\05-cicd-deployment-publishing.md"
        Labels = "ci/cd,automation,devops"
    }
)

Write-Host "=== Tamil Dictation GitHub Issues Helper ===" -ForegroundColor Cyan
Write-Host "Opening issues in your default browser to submit on GitHub..." -ForegroundColor Yellow

foreach ($item in $issues) {
    $body = ""
    if (Test-Path $item.File) {
        $body = Get-Content $item.File -Raw
    }
    
    $encodedTitle = [System.Uri]::EscapeDataString($item.Title)
    $encodedBody  = [System.Uri]::EscapeDataString($body)
    $encodedLabels = [System.Uri]::EscapeDataString($item.Labels)
    
    $url = "$repoUrl`?title=$encodedTitle&body=$encodedBody&labels=$encodedLabels"
    Write-Host "`nOpening: $($item.Title)" -ForegroundColor Green
    Start-Process $url
    Start-Sleep -Milliseconds 600
}

Write-Host "`nAll issue links opened in browser!" -ForegroundColor Cyan
