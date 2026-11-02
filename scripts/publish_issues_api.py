import os
import sys
import json
import urllib.request
import urllib.error

token = os.environ.get("GITHUB_TOKEN")
if not token and len(sys.argv) > 1:
    token = sys.argv[1]

if not token:
    print("Error: Please provide a GitHub Personal Access Token.")
    print("Usage: python scripts/publish_issues_api.py <YOUR_GITHUB_TOKEN>")
    sys.exit(1)

owner = "Ebenezerillango7"
repo = "tamil-dictation"
api_url = f"https://api.github.com/repos/{owner}/{repo}/issues"

issues = [
    {
        "title": "Tamil Dialect Speech Recognition and Translation to Text",
        "file": ".github/issues/01-tamil-dialect-speech-recognition.md",
        "labels": ["feature", "speech-engine", "dialect"]
    },
    {
        "title": "Interactive Mode UI/UX with Real-Time Audio Visualizer",
        "file": ".github/issues/02-interactive-ui-ux-mode.md",
        "labels": ["enhancement", "ui/ux", "visualizer"]
    },
    {
        "title": "Audio Recording and File Upload Processing Pipeline",
        "file": ".github/issues/03-audio-record-and-upload.md",
        "labels": ["feature", "audio-processing", "file-upload"]
    },
    {
        "title": "Dedicated Below Output Window with Full Manual Text Editing",
        "file": ".github/issues/04-below-output-window-editable.md",
        "labels": ["feature", "editor", "export"]
    },
    {
        "title": "Automated CI/CD, GitHub Pages Deployment and Release Publishing",
        "file": ".github/issues/05-cicd-deployment-publishing.md",
        "labels": ["ci/cd", "automation", "devops"]
    }
]

print(f"=== Publishing Issues to {owner}/{repo} via GitHub REST API ===")

for idx, issue in enumerate(issues, 1):
    body_text = ""
    if os.path.exists(issue["file"]):
        with open(issue["file"], "r", encoding="utf-8") as f:
            body_text = f.read()
    else:
        body_text = issue["title"]

    payload = {
        "title": issue["title"],
        "body": body_text,
        "labels": issue["labels"]
    }

    req = urllib.request.Request(
        api_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "TamilDictation-IssuePublisher",
            "Content-Type": "application/json"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"[{idx}/5] Successfully created Issue #{data['number']}: {data['html_url']}")
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode("utf-8")
        print(f"[{idx}/5] HTTP Error {e.code}: {error_msg}")
    except Exception as e:
        print(f"[{idx}/5] Error: {e}")

print("\nDone!")
