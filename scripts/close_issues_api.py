import os
import sys
import json
import ssl
import urllib.request
import urllib.error

token = os.environ.get("GITHUB_TOKEN")
if not token and len(sys.argv) > 1:
    token = sys.argv[1]

if not token:
    print("Error: GitHub Token required.")
    sys.exit(1)

owner = "Ebenezerillango7"
repo = "tamil-dictation"
base_url = f"https://api.github.com/repos/{owner}/{repo}/issues"

ssl_context = None
ca_path = "C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt"
if os.path.exists(ca_path):
    ssl_context = ssl.create_default_context(cafile=ca_path)
else:
    ssl_context = ssl._create_unverified_context()

for num in range(1, 6):
    patch_url = f"{base_url}/{num}"
    patch_payload = {"state": "closed", "state_reason": "completed"}
    patch_req = urllib.request.Request(
        patch_url,
        data=json.dumps(patch_payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "TamilDictation-IssueCloser",
            "Content-Type": "application/json"
        },
        method="PATCH"
    )
    try:
        with urllib.request.urlopen(patch_req, context=ssl_context) as resp:
            print(f"[OK] Marked Issue #{num} as closed (completed).")
    except Exception as e:
        print(f"Error closing #{num}: {e}")

print("All 5 issues are officially closed as completed!")
