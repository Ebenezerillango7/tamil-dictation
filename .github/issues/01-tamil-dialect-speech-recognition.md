---
title: "🗣️ Tamil Dialect Speech Recognition & Translation to Text"
labels: ["feature", "speech-engine", "dialect"]
milestone: "M1: Speech & Dialect Engine"
assignees: ["Ebenezerillango7"]
---

### Summary
Implement speech recognition for Tamil that handles multiple regional dialects and translates spoken phrases into clean text, with an option to convert colloquial dialect speech into formal written Tamil.

### Supported Dialect Locales
- `ta-IN` (Tamil Nadu: Standard, Chennai/Madras Bashai, Kongu, Madurai/Southern, Nellai)
- `ta-LK` (Sri Lanka / Eelam Tamil)
- `ta-SG` (Singapore Tamil)
- `ta-MY` (Malaysia Tamil)

### Key Features
1. **Dialect Vocabulary & Normalization Engine**:
   - Spoken colloquial phrase substitution (e.g. `வூட்ல` ➔ `வீட்டில்`, `வந்துட்டேன்` ➔ `வந்துவிட்டேன்`, `பண்றேன்` ➔ `செய்கிறேன்`, `விளங்குது` ➔ `புரிகிறது`).
   - Toggle between **Raw Spoken Dialect** and **Standard Written Tamil**.
2. **Tamil Voice Punctuation & Formatting Commands**:
   - `"முற்றுப்புள்ளி"` / `"புள்ளி"` ➔ `.`
   - `"கால்புள்ளி"` / `"கமா"` ➔ `,`
   - `"கேள்விக்குறி"` ➔ `?`
   - `"ஆச்சரியக்குறி"` ➔ `!`
   - `"புதிய வரி"` / `"அடுத்த வரி"` ➔ `\n` (Enter)
   - `"புதிய பத்தி"` ➔ `\n\n` (New paragraph)

### Acceptance Criteria
- [ ] Language switching dynamically changes speech recognition locale.
- [ ] Spoken dialect words are properly recognized and translated.
- [ ] Punctuation voice triggers work seamlessly during speech.
- [ ] Error messages for denied mic permission, no speech, or offline status are shown in Tamil.
