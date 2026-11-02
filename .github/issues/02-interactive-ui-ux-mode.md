---
title: "🎨 Interactive Mode UI/UX with Real-Time Audio Visualizer"
labels: ["enhancement", "ui/ux", "visualizer"]
milestone: "M2: Interactive UI & Visualizer"
assignees: ["Ebenezerillango7"]
---

### Summary
Provide a modern, intuitive, and interactive UI/UX for Tamil dictation, featuring live waveform visualizers, sound level meters, interim speech bubbles, and theme toggling.

### Key Features
1. **Real-time Audio Visualizer**:
   - HTML5 Canvas powered by Web Audio API `AnalyserNode`.
   - Dynamic animated oscilloscope waveform & frequency bars responding to live voice audio.
2. **Interactive Status Indicator & Recording Timer**:
   - Live pulse indicator (Ready, Recording, Processing).
   - Real-time timer (`00:00:00`).
3. **Live Interim Subtitle Bubble**:
   - Real-time feedback bubble showing interim unfinalized speech before committing to the editor.
4. **Theme Switcher**:
   - High-contrast Light and Dark mode toggle with persistent state in `localStorage`.
5. **Interactive Help Pills**:
   - Quick voice command suggestion chips and cheatsheet.

### Acceptance Criteria
- [ ] Visualizer renders smooth animations on voice input.
- [ ] Interim text updates with zero perceptible lag.
- [ ] Theme switcher switches between light and dark without layout distortion.
- [ ] Responsive across desktop, tablet, and mobile browsers.

