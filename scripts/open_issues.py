import urllib.parse
import webbrowser
import os
import time

repo_url = "https://github.com/Ebenezerillango7/tamil-dictation/issues/new"

issues = [
    {
        "title": "Tamil Dialect Speech Recognition and Translation to Text",
        "file": ".github/issues/01-tamil-dialect-speech-recognition.md",
        "labels": "feature,speech-engine,dialect"
    },
    {
        "title": "Interactive Mode UI/UX with Real-Time Audio Visualizer",
        "file": ".github/issues/02-interactive-ui-ux-mode.md",
        "labels": "enhancement,ui/ux,visualizer"
    },
    {
        "title": "Audio Recording and File Upload Processing Pipeline",
        "file": ".github/issues/03-audio-record-and-upload.md",
        "labels": "feature,audio-processing,file-upload"
    },
    {
        "title": "Dedicated Below Output Window with Full Manual Text Editing",
        "file": ".github/issues/04-below-output-window-editable.md",
        "labels": "feature,editor,export"
    },
    {
        "title": "Automated CI/CD, GitHub Pages Deployment and Release Publishing",
        "file": ".github/issues/05-cicd-deployment-publishing.md",
        "labels": "ci/cd,automation,devops"
    }
]

print("=== Opening GitHub Issues in Browser ===")

for idx, issue in enumerate(issues, 1):
    body_text = ""
    if os.path.exists(issue["file"]):
        with open(issue["file"], "r", encoding="utf-8") as f:
            body_text = f.read()
    else:
        body_text = issue["title"]

    query = urllib.parse.urlencode({
        "title": issue["title"],
        "body": body_text,
        "labels": issue["labels"]
    })
    full_url = f"{repo_url}?{query}"
    print(f"[{idx}/5] Opening: {issue['title']}")
    webbrowser.open(full_url)
    time.sleep(0.5)

print("\nAll 5 issue creation pages opened in your browser!")
