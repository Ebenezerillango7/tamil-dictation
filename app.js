// Tamil Voice Dictation Application
// Handles SpeechRecognition API for Tamil voice-to-text conversion

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const transcriptionArea = document.getElementById('transcriptionArea');
  const interimText = document.getElementById('interimText');
  const toggleRecordBtn = document.getElementById('toggleRecordBtn');
  const recordBtnText = document.getElementById('recordBtnText');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadTxtBtn = document.getElementById('downloadTxtBtn');
  const downloadDocBtn = document.getElementById('downloadDocBtn');
  const languageSelect = document.getElementById('languageSelect');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const wordCount = document.getElementById('wordCount');
  const charCount = document.getElementById('charCount');
  const toast = document.getElementById('toast');

  // Check browser SpeechRecognition support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    statusText.textContent = 'உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை (Google Chrome அல்லது Edge பயன்படுத்தவும்).';
    statusText.style.color = '#ef4444';
    toggleRecordBtn.disabled = true;
    return;
  }

  let recognition = new SpeechRecognition();
  let isRecording = false;
  let finalTranscript = '';

  // Setup recognition properties
  function setupRecognition() {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    recognition.onstart = () => {
      isRecording = true;
      toggleRecordBtn.classList.add('recording');
      recordBtnText.textContent = 'நிறுத்துக';
      statusDot.classList.add('active');
      statusText.textContent = 'கேட்கிறது... தமிழில் பேசுங்கள்.';
      statusText.style.color = '#ef4444';
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      transcriptionArea.value = finalTranscript;
      interimText.textContent = interimTranscript;
      updateStats();
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition event:', event.error);
      if (event.error === 'not-allowed') {
        statusText.textContent = 'மைக்ரோஃபோன் அணுகல் மறுக்கப்பட்டது. அமைப்புகளில் அனுமதிக்கவும்.';
        stopRecording();
      } else if (event.error === 'no-speech') {
        statusText.textContent = 'குரல் கேட்கவில்லை. மீண்டும் பேசவும்...';
      } else if (event.error === 'network') {
        statusText.textContent = 'இணைய இணைப்பு பிழை ஏற்பட்டுள்ளது.';
      }
    };

    recognition.onend = () => {
      // If still marked as recording (browser auto-stopped silence), restart it
      if (isRecording) {
        try {
          recognition.start();
        } catch (e) {
          stopRecording();
        }
      } else {
        stopRecording();
      }
    };
  }

  // Toggle recording state
  function toggleRecording() {
    if (isRecording) {
      isRecording = false;
      recognition.stop();
      stopRecording();
    } else {
      // Sync initial textarea content with finalTranscript
      finalTranscript = transcriptionArea.value ? transcriptionArea.value.trim() + ' ' : '';
      recognition.lang = languageSelect.value;
      try {
        recognition.start();
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    }
  }

  function stopRecording() {
    isRecording = false;
    toggleRecordBtn.classList.remove('recording');
    recordBtnText.textContent = 'பேசத் தொடங்கு';
    statusDot.classList.remove('active');
    statusText.textContent = 'தயாராக உள்ளது (பேசத் தொடங்க மைக்ரோஃபோனை அழுத்தவும்)';
    statusText.style.color = '';
    interimText.textContent = '';
  }

  // Calculate word and character counts
  function updateStats() {
    const text = transcriptionArea.value.trim();
    charCount.textContent = text.length;

    if (text.length === 0) {
      wordCount.textContent = '0';
      return;
    }

    const words = text.split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
  }

  // Display toast notification
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Export handlers
  function copyToClipboard() {
    const text = transcriptionArea.value.trim();
    if (!text) {
      showToast('நகலெடுக்க உரை எதுவும் இல்லை!');
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => showToast('உரை வெற்றிகரமாக நகலெடுக்கப்பட்டது! 📋'))
      .catch(() => showToast('நகலெடுப்பதில் பிழை ஏற்பட்டது!'));
  }

  function downloadAsTxt() {
    const text = transcriptionArea.value.trim();
    if (!text) {
      showToast('பதிவிறக்க உரை எதுவும் இல்லை!');
      return;
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamil-dictation-${getTimestamp()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('.TXT கோப்பு பதிவிறக்கம் செய்யப்பட்டது! 📄');
  }

  function downloadAsDoc() {
    const text = transcriptionArea.value.trim();
    if (!text) {
      showToast('பதிவிறக்க உரை எதுவும் இல்லை!');
      return;
    }

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Tamil Dictation</title></head>
      <body style="font-family: Arial, sans-serif; font-size: 14pt; line-height: 1.6;">
        <p>${text.replace(/\n/g, '<br/>')}</p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamil-dictation-${getTimestamp()}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('.DOC கோப்பு பதிவிறக்கம் செய்யப்பட்டது! 📝');
  }

  function clearText() {
    if (!transcriptionArea.value.trim()) return;

    if (confirm('அனைத்து உரைகளையும் அழிக்க விரும்புகிறீர்களா?')) {
      transcriptionArea.value = '';
      finalTranscript = '';
      interimText.textContent = '';
      updateStats();
      showToast('உரை அழிக்கப்பட்டது! 🗑️');
    }
  }

  function getTimestamp() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  }

  // Event Listeners
  toggleRecordBtn.addEventListener('click', toggleRecording);
  clearBtn.addEventListener('click', clearText);
  copyBtn.addEventListener('click', copyToClipboard);
  downloadTxtBtn.addEventListener('click', downloadAsTxt);
  downloadDocBtn.addEventListener('click', downloadAsDoc);

  transcriptionArea.addEventListener('input', () => {
    finalTranscript = transcriptionArea.value;
    updateStats();
  });

  languageSelect.addEventListener('change', () => {
    if (isRecording) {
      recognition.stop();
      isRecording = false;
      setTimeout(() => {
        setupRecognition();
        toggleRecording();
      }, 300);
    } else {
      setupRecognition();
    }
    showToast(`மொழி மாற்றப்பட்டது: ${languageSelect.options[languageSelect.selectedIndex].text}`);
  });

  // Initialize
  setupRecognition();
  updateStats();
});
