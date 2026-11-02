import urllib.parse
import webbrowser
import time
import sys

# Ensure UTF-8 output if possible
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

repo_url = "https://github.com/Ebenezerillango7/tamil-dictation/issues/new"

issues = [
    {
        "title": "Tamil Dialect Speech Recognition and Translation to Text",
        "labels": "feature,dialect",
        "body": """### Summary
Implement speech recognition for Tamil that understands multiple regional dialects and translates spoken phrases into clean text.

### Requirements
- Support locales: `ta-IN` (Tamil Nadu), `ta-LK` (Sri Lanka), `ta-SG` (Singapore), `ta-MY` (Malaysia).
- Dialect vocabulary normalization (e.g. வூட்ல ➔ வீட்டில், வந்துட்டேன் ➔ வந்துவிட்டேன், பண்றேன் ➔ செய்கிறேன்).
- Voice punctuation commands: முற்றுப்புள்ளி (.), கால்புள்ளி (,), கேள்விக்குறி (?), புதிய வரி (Enter)."""
    },
    {
        "title": "Interactive Mode UI/UX with Real-Time Audio Visualizer",
        "labels": "enhancement,ui/ux",
        "body": """### Summary
Create an engaging, interactive UI/UX mode with real-time audio visualizers and responsive controls.

### Requirements
- Web Audio API canvas visualizer (oscilloscope waveform & spectrum bars).
- Live interim speech preview bubble and recording timer.
- Light and Dark mode theme toggle."""
    },
    {
        "title": "Audio Recording and File Upload Processing Pipeline",
        "labels": "feature,audio-processing",
        "body": """### Summary
Provide audio recording with local file download and audio file upload with transcription.

### Requirements
- MediaRecorder audio capture with pause/resume and download (.webm/.wav).
- Drag & drop audio file upload (.mp3, .wav, .m4a, .ogg).
- Audio player with scrub bar and playback speed control (0.75x, 1x, 1.25x, 1.5x)."""
    },
    {
        "title": "Dedicated Below Output Window with Full Manual Text Editing",
        "labels": "feature,editor",
        "body": """### Summary
Place a dedicated transcription output window below the controls with complete manual editing support.

### Requirements
- Positioned below audio input controls for live transcript display and manual typing.
- Quick Tamil punctuation bar (., ?, !, "", (), :).
- Dialect normalizer button (✨ எழுத்து வடிவாக்குக).
- Tamil Search & Replace tool.
- Word/character counters and export to TXT, Word (.doc), and PDF."""
    },
    {
        "title": "Automated CI/CD, GitHub Pages Deployment and Release Publishing",
        "labels": "ci/cd,automation",
        "body": """### Summary
Configure GitHub Actions workflows for continuous integration, GitHub Pages deployment, and releases.

### Requirements
- `.github/workflows/ci.yml`: Code syntax and validation checks.
- `.github/workflows/deploy.yml`: Auto-deploy to GitHub Pages on push to `main`.
- `.github/workflows/release.yml`: Automated GitHub release on version tag."""
    }
]

print("=== Opening 5 Pre-filled Issues in Browser ===")

for idx, item in enumerate(issues, 1):
    q = urllib.parse.urlencode({
        "title": item["title"],
        "body": item["body"],
        "labels": item["labels"]
    })
    url = f"{repo_url}?{q}"
    print(f"[{idx}/5] Opening: {item['title']}")
    webbrowser.open(url)
    time.sleep(1.0)

print("\nAll 5 issue pages are now opened in your browser!")
