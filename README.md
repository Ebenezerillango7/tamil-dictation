# 🎙️ தமிழ் குரல் தட்டச்சு (Tamil Voice Dictation)

[![CI - Code Quality & Validation](https://github.com/Ebenezerillango7/tamil-dictation/actions/workflows/ci.yml/badge.svg)](https://github.com/Ebenezerillango7/tamil-dictation/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Ebenezerillango7/tamil-dictation/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ebenezerillango7/tamil-dictation/actions/workflows/deploy.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

An open-source, client-side, real-time Tamil speech-to-text dictation application built with the Web Speech API. Easily convert spoken Tamil words into text, copy to clipboard, or export directly to `.txt` and `.doc` files.

---

## 🌟 Key Features

- **Real-Time Tamil Speech Recognition**: High accuracy continuous voice recognition powered by standard browser Web Speech APIs.
- **Multiple Dialect Locales**:
  - `ta-IN` (Tamil Nadu / India)
  - `ta-LK` (Sri Lanka)
  - `ta-SG` (Singapore)
  - `ta-MY` (Malaysia)
- **Live Interim Preview**: Real-time feedback while speaking before finalizing the transcript.
- **One-Click Export**:
  - 📋 Copy to clipboard
  - 📄 Export as plain text (`.txt`)
  - 📝 Export as formatted Word document (`.doc`)
- **Modern Responsive Interface**: Beautiful Mukta Malar Tamil typography with clean UI for both mobile and desktop.
- **Automated GitHub Workflows**: Built-in CI validation, GitHub Pages automated deployment, and semantic release publishing.

---

## 📁 Project Structure

```text
tamil-dictation/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Validates code on push and pull requests
│   │   ├── deploy.yml             # Auto-deploys to GitHub Pages on push to main
│   │   └── release.yml            # Builds zip package and publishes GitHub Release on tag
│   ├── ISSUE_TEMPLATE/            # GitHub issue forms (Bug report & Feature request)
│   └── pull_request_template.md   # Standard pull request checklist
├── .vscode/
│   ├── extensions.json            # Recommended VS Code extensions for GitHub workflow
│   ├── settings.json              # VS Code Git and editor configurations
│   └── tasks.json                 # Pre-configured VS Code tasks (Pull, Push, Preview)
├── scripts/
│   ├── sync.ps1                   # Interactive PowerShell script to pull, commit, and push
│   └── create-release.ps1         # Script to tag and trigger automated GitHub Release
├── app.js                         # Core speech recognition logic
├── index.html                     # Application UI
├── style.css                      # Design and animations
├── .gitattributes                 # Cross-platform line ending normalization
├── .gitignore                     # Git ignore rules
├── LICENSE                        # MIT License
└── README.md                      # Documentation & workflow guide
```

---

## 🚀 Getting Started

### 1. Open in VS Code
Open the repository folder in VS Code:
```powershell
code "D:\Projects\Tamil Dictation"
```

### 2. Run Local Preview Server
You can preview the app using Python's built-in web server:
- In VS Code, press `Ctrl+Shift+B` (Runs default task: **Dev: Preview Local Web Server**).
- Or run in terminal:
  ```powershell
  python -m http.server 3000
  ```
- Open `http://localhost:3000` in Google Chrome or Microsoft Edge.

---

## 🔄 Git & GitHub Workflows

### 1. 📥 Pull Workflow (Fetching Latest Updates)
Always pull before making changes to prevent merge conflicts:
- **Using VS Code UI**: Click the **...** (More actions) menu in the Source Control side panel -> **Pull**.
- **Using VS Code Task**: Press `Ctrl+Shift+P` -> type `Tasks: Run Task` -> choose `Git: Pull Latest (origin/main)`.
- **Using Terminal**:
  ```powershell
  git pull --rebase --autostash origin main
  ```

---

### 2. 📤 Push Workflow (Publishing Code Changes)
To save and push your changes to GitHub:

#### Option A: Using the VS Code Source Control GUI
1. Open the **Source Control** view (`Ctrl+Shift+G`).
2. Type your commit message into the text box.
3. Click the **Commit** button (or press `Ctrl+Enter`).
4. Click **Sync Changes** (or **Push**).

#### Option B: Using the Included PowerShell Sync Script
Run the automated helper script in terminal:
```powershell
.\scripts\sync.ps1 -Message "Add new features to Tamil dictation"
```

#### Option C: Standard Git CLI
```powershell
git add -A
git commit -m "Your descriptive message"
git push origin main
```

---

### 3. 🌐 Deployment Workflow (GitHub Pages)
This repository is configured with `.github/workflows/deploy.yml` for automated zero-cost hosting on **GitHub Pages**:

1. In your GitHub repository, go to **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Every time you push a commit to `main`, GitHub Actions automatically builds and deploys your site to:
   ```text
   https://ebenezerillango7.github.io/tamil-dictation/
   ```

---

### 4. 🏷️ Publishing Workflow (Releases)
When you are ready to publish a new version release:

#### Option A: Using the PowerShell Release Helper
Run:
```powershell
.\scripts\create-release.ps1 -Version "v1.0.0"
```

#### Option B: Using Git Tags
```powershell
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

#### What Happens Automatically:
- GitHub Actions triggers `.github/workflows/release.yml`.
- A zip package (`tamil-dictation-v1.0.0.zip`) containing the distribution files is bundled.
- A official **GitHub Release** is created with release notes and downloadable assets.

---

## 🛠️ Setting Up VS Code for GitHub

Follow these steps once to ensure your VS Code is fully authenticated and ready with GitHub:

1. **Sign into GitHub inside VS Code**:
   - In VS Code, look at the bottom-left gear icon or accounts icon (Accounts).
   - Click **Accounts** -> **Sign in to Sync Settings** or **Sign in with GitHub**.
   - A browser window will open; authorize VS Code to access your GitHub account (`Ebenezerillango7`).

2. **Configure your Git Username & Email**:
   In VS Code's integrated terminal (`Ctrl+~`), run:
   ```powershell
   git config --global user.name "Ebenezer Illango"
   git config --global user.email "your_email@example.com"
   ```

3. **Install Recommended Extensions**:
   - Press `Ctrl+Shift+X` (Extensions view).
   - In the search bar, type `@recommended` and click **Install All Workspace Recommendations**.
   - These include **GitHub Pull Requests and Issues**, **GitLens**, and **Git Graph**.

---

## 🤝 Contributing & Pull Requests

1. Create a new branch:
   ```powershell
   git checkout -b feature/audio-improvements
   ```
2. Make your edits and commit them.
3. Push the branch to GitHub:
   ```powershell
   git push -u origin feature/audio-improvements
   ```
4. Open GitHub and create a **Pull Request**. The template in `.github/pull_request_template.md` will guide you.
5. GitHub Actions CI will automatically test and validate your pull request.

---

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
