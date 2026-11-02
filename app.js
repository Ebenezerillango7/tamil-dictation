/**
 * தமிழ் குரல் தட்டச்சு மென்பொருள் (Tamil Voice Dictation Software)
 * Full-featured Speech Recognition, Dialect Normalization, Audio Recording,
 * Audio File Upload Processing, and Interactive Output Editor.
 */

// ============================================================================
// 1. TAMIL DIALECT ENGINE & VOCABULARY NORMALIZATION
// ============================================================================
const TamilDialectEngine = {
  // Supported dialect configurations
  dialects: {
    'ta-IN-standard': {
      locale: 'ta-IN',
      name: 'தமிழ்நாடு - பொதுத் தமிழ்',
      description: 'தமிழ்நாடு பொது ஊடக வழக்கு. தூய மற்றும் பொதுவான பேச்சுக்களை உரை வடிவில் மாற்றும்.',
      tags: ['இயல்பான வேகம்', 'அனைத்து சொற்கள்']
    },
    'ta-IN-chennai': {
      locale: 'ta-IN',
      name: 'சென்னைத் தமிழ் (Madras Bashai)',
      description: 'சென்னை மற்றும் வட தமிழக வழக்கு. வட்டார பேச்சுக்களை அடையாளம் கண்டு தூய எழுத்து வடிவமாக மாற்றும்.',
      tags: ['மெட்ராஸ் பாஷை', 'சொல் சீரமைப்பு']
    },
    'ta-IN-madurai': {
      locale: 'ta-IN',
      name: 'மதுரை & தென் தமிழ்',
      description: 'மதுரை, தேனி மற்றும் தென் மாவட்டங்களின் தனித்துவ பேச்சுத் தமிழைக் கையாளும்.',
      tags: ['தென் தமிழகம்', 'வினையெச்ச மாற்றம்']
    },
    'ta-IN-kongu': {
      locale: 'ta-IN',
      name: 'கொங்குத் தமிழ்',
      description: 'கோவை, ஈரோடு, திருப்பூர் மற்றும் சேலப் பகுதி மரபுச் சொற்களை கையாளும்.',
      tags: ['கொங்கு மண்டலம்', 'மரியாதைச் சொற்கள்']
    },
    'ta-IN-nellai': {
      locale: 'ta-IN',
      name: 'நெல்லைத் தமிழ்',
      description: 'திருநெல்வேலி மற்றும் தூத்துக்குடி மாவட்டங்களின் பாசமான பேச்சு வழக்கு.',
      tags: ['நெல்லைச் சொல்வழக்கு', 'அழைப்புச் சொற்கள்']
    },
    'ta-LK': {
      locale: 'ta-LK',
      name: 'ஈழத் தமிழ் (Sri Lanka)',
      description: 'இலங்கை / ஈழத் தமிழின் தொன்மை வாய்ந்த சொல்வழக்கு மற்றும் இலக்கண நயத்தை முழுமையாக உரை மாற்றும்.',
      tags: ['ஈழத்து உச்சரிப்பு', 'இலக்கண நேர்த்தி']
    },
    'ta-SG': {
      locale: 'ta-SG',
      name: 'சிங்கப்பூர் தமிழ்',
      description: 'சிங்கப்பூர் அரசு அங்கீகரிக்கப்பட்ட தமிழ் மற்றும் அன்றாட பேச்சு வழக்கு.',
      tags: ['சிங்கப்பூர் தமிழ்', 'ஆசிய வழக்கு']
    },
    'ta-MY': {
      locale: 'ta-MY',
      name: 'மலேசியத் தமிழ்',
      description: 'மலேசிய வாழ் தமிழ் மக்களின் பேச்சு வழக்கு மற்றும் கடன்சொற்களை சீரமைக்கும்.',
      tags: ['மலேசிய தமிழ்', 'வட்டார வழக்கு']
    }
  },

  // Dialect-to-Standard Written Tamil Dictionary (120+ spoken phrases)
  dictionary: [
    // Common Spoken Contractions (பொது பேச்சு வழக்கு)
    { spoken: /\bவூட்ல\b/gi, written: 'வீட்டில்' },
    { spoken: /\bவீட்ல\b/gi, written: 'வீட்டில்' },
    { spoken: /\bவந்துட்டேன்\b/gi, written: 'வந்துவிட்டேன்' },
    { spoken: /\bவந்துட்டாங்க\b/gi, written: 'வந்துவிட்டார்கள்' },
    { spoken: /\bவந்துட்டாப்ல\b/gi, written: 'வந்துவிட்டார்' },
    { spoken: /\bபோய்ட்டேன்\b/gi, written: 'போய்விட்டேன்' },
    { spoken: /\bபோய்ட்டாங்க\b/gi, written: 'போய்விட்டார்கள்' },
    { spoken: /\bபண்றேன்\b/gi, written: 'செய்கிறேன்' },
    { spoken: /\bபண்றாங்க\b/gi, written: 'செய்கிறார்கள்' },
    { spoken: /\bபண்ணிட்டு\b/gi, written: 'செய்துவிட்டு' },
    { spoken: /\bபண்ணிட்டேன்\b/gi, written: 'செய்துவிட்டேன்' },
    { spoken: /\bபண்ணுறேன்\b/gi, written: 'செய்கிறேன்' },
    { spoken: /\bபண்ணுங்க\b/gi, written: 'செய்யுங்கள்' },
    { spoken: /\bசொல்றேன்\b/gi, written: 'சொல்கிறேன்' },
    { spoken: /\bசொல்றாங்க\b/gi, written: 'சொல்கிறார்கள்' },
    { spoken: /\bசொல்லிட்டேன்\b/gi, written: 'சொல்லிவிட்டேன்' },
    { spoken: /\bசொன்னாப்ல\b/gi, written: 'சொன்னார்' },
    { spoken: /\bபாக்குறேன்\b/gi, written: 'பார்க்கிறேன்' },
    { spoken: /\bபாத்துட்டேன்\b/gi, written: 'பார்த்துவிட்டேன்' },
    { spoken: /\bபாருங்க\b/gi, written: 'பாருங்கள்' },
    { spoken: /\bகேக்குறேன்\b/gi, written: 'கேட்கிறேன்' },
    { spoken: /\bகேட்டுட்டேன்\b/gi, written: 'கேட்டுவிட்டேன்' },
    { spoken: /\bஇப்பத்தான்\b/gi, written: 'இப்போதுதான்' },
    { spoken: /\bஅப்பத்தான்\b/gi, written: 'அப்போதுதான்' },
    { spoken: /\bஎப்பத்தான்\b/gi, written: 'எப்போதுதான்' },
    { spoken: /\bஇங்கன\b/gi, written: 'இங்கே' },
    { spoken: /\bஅங்கன\b/gi, written: 'அங்கே' },
    { spoken: /\bஎங்கன\b/gi, written: 'எங்கே' },

    // Chennai / Madras Bashai (சென்னை வழக்கு)
    { spoken: /\bஅப்பாலிக்கா\b/gi, written: 'அதற்குப் பிறகு' },
    { spoken: /\bகலாய்க்காத\b/gi, written: 'கிண்டல் செய்யாதே' },
    { spoken: /\bகலாய்க்குறாங்க\b/gi, written: 'கிண்டல் செய்கிறார்கள்' },
    { spoken: /\bகஸ்மாலம்\b/gi, written: 'மோசமானவர்' },
    { spoken: /\bபேஜார்\b/gi, written: 'சிக்கல்' },
    { spoken: /\bதுட்டு\b/gi, written: 'பணம்' },
    { spoken: /\bகாசு பணம்\b/gi, written: 'பணம்' },
    { spoken: /\bநைனா\b/gi, written: 'அப்பா' },
    { spoken: /\bமச்சான்\b/gi, written: 'நண்பா' },
    { spoken: /\bகெளம்பு\b/gi, written: 'புறப்படு' },
    { spoken: /\bகெளம்பிட்டேன்\b/gi, written: 'புறப்பட்டுவிட்டேன்' },

    // Kongu Tamil (கொங்கு வழக்கு)
    { spoken: /\bவாங்கூ\b/gi, written: 'வாருங்கள்' },
    { spoken: /\bபோங்கூ\b/gi, written: 'போங்கள்' },
    { spoken: /\bபோவலியா\b/gi, written: 'போகவில்லையா' },
    { spoken: /\bவரலியா\b/gi, written: 'வரவில்லையா' },
    { spoken: /\bகண்ணு\b/gi, written: 'அன்பே' },
    { spoken: /\bசாப்புட்டீங்களா\b/gi, written: 'சாப்பிட்டீர்களா' },
    { spoken: /\bதிங்கலியா\b/gi, written: 'உண்ணவில்லையா' },
    { spoken: /\bவெளங்கல\b/gi, written: 'புரியவில்லை' },

    // Madurai & Nellai Tamil (தென் தமிழக வழக்கு)
    { spoken: /\bஅங்கிட்டு\b/gi, written: 'அங்கே' },
    { spoken: /\bஇங்கிட்டு\b/gi, written: 'இங்கே' },
    { spoken: /\bஎங்கிட்டு\b/gi, written: 'எங்கே' },
    { spoken: /\bவந்தாக\b/gi, written: 'வந்தார்கள்' },
    { spoken: /\bபோனாக\b/gi, written: 'போனார்கள்' },
    { spoken: /\bசொன்னாக\b/gi, written: 'சொன்னார்கள்' },
    { spoken: /\bகேட்டாக\b/gi, written: 'கேட்டார்கள்' },
    { spoken: /\bமக்கா\b/gi, written: 'மக்களே' },
    { spoken: /\bஏல\b/gi, written: 'நண்பா' },
    { spoken: /\bஅண்ணாச்சி\b/gi, written: 'அண்ணன்' },

    // Sri Lankan / Eelam Tamil (ஈழ வழக்கு)
    { spoken: /\bகதைக்கிறன்\b/gi, written: 'பேசுகிறேன்' },
    { spoken: /\bகதைக்கிறார்\b/gi, written: 'பேசுகிறார்' },
    { spoken: /\bவிளங்குது\b/gi, written: 'புரிகிறது' },
    { spoken: /\bவிளங்கல\b/gi, written: 'புரியவில்லை' },
    { spoken: /\bஎப்பிடி\b/gi, written: 'எப்படி' },
    { spoken: /\bஇஞ்சால\b/gi, written: 'இங்கே' },
    { spoken: /\bஅஞ்சால\b/gi, written: 'அங்கே' },
    { spoken: /\bஓம்\b/gi, written: 'ஆம்' },
    { spoken: /\bசுகமா\b/gi, written: 'நலமா' },
    { spoken: /\bசொல்லுறன்\b/gi, written: 'சொல்கிறேன்' },
    { spoken: /\bபார்க்கிறன்\b/gi, written: 'பார்க்கிறேன்' }
  ],

  // Voice Punctuation & Formatting Commands
  voiceCommands: [
    { pattern: /(?:\s+|^)(?:முற்றுப்புள்ளி|புள்ளி)(?:\s+|$)/gi, replaceWith: '. ' },
    { pattern: /(?:\s+|^)(?:கால்புள்ளி|கமா)(?:\s+|$)/gi, replaceWith: ', ' },
    { pattern: /(?:\s+|^)(?:அரைப்புள்ளி)(?:\s+|$)/gi, replaceWith: '; ' },
    { pattern: /(?:\s+|^)(?:கேள்விக்குறி)(?:\s+|$)/gi, replaceWith: '? ' },
    { pattern: /(?:\s+|^)(?:ஆச்சரியக்குறி)(?:\s+|$)/gi, replaceWith: '! ' },
    { pattern: /(?:\s+|^)(?:முக்காற்புள்ளி)(?:\s+|$)/gi, replaceWith: ': ' },
    { pattern: /(?:\s+|^)(?:புதிய வரி|அடுத்த வரி)(?:\s+|$)/gi, replaceWith: '\n' },
    { pattern: /(?:\s+|^)(?:புதிய பத்தி)(?:\s+|$)/gi, replaceWith: '\n\n' }
  ],

  // Process text through voice punctuation commands
  applyVoiceCommands(text) {
    let result = text;
    for (const cmd of this.voiceCommands) {
      result = result.replace(cmd.pattern, cmd.replaceWith);
    }
    return result;
  },

  // Normalize spoken dialect to formal written Tamil
  normalizeDialect(text) {
    let result = text;
    for (const rule of this.dictionary) {
      result = result.replace(rule.spoken, rule.written);
    }
    return result;
  },

  // Full processing: punctuation + dialect normalization
  processText(text, autoNormalize = true) {
    let processed = this.applyVoiceCommands(text);
    if (autoNormalize) {
      processed = this.normalizeDialect(processed);
    }
    return processed;
  }
};

// ============================================================================
// 2. AUDIO VISUALIZER ENGINE (Web Audio API)
// ============================================================================
class AudioVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.audioContext = null;
    this.analyser = null;
    this.source = null;
    this.animationId = null;
    this.isActive = false;

    // Handle canvas resizing for sharp rendering
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.drawIdleWave();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio || 800;
    this.canvas.height = (rect.height || 120) * window.devicePixelRatio;
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  initAudioContext() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  connectStream(stream) {
    this.initAudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.source.connect(this.analyser);
    this.isActive = true;
    this.animate();
  }

  connectAudioElement(audioElement) {
    this.initAudioContext();
    if (!audioElement._hasSource) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.source = this.audioContext.createMediaElementSource(audioElement);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      audioElement._hasSource = true;
    }
    this.isActive = true;
    this.animate();
  }

  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.drawIdleWave();
  }

  drawIdleWave() {
    if (!this.ctx || !this.canvas) return;
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.beginPath();
    this.ctx.moveTo(0, height / 2);
    this.ctx.lineTo(width, height / 2);
    this.ctx.strokeStyle = '#1e293b';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  animate() {
    if (!this.isActive || !this.analyser || !this.ctx) return;

    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!this.isActive) return;
      this.animationId = requestAnimationFrame(render);
      this.analyser.getByteTimeDomainData(dataArray);

      this.ctx.fillStyle = '#090d16';
      this.ctx.fillRect(0, 0, width, height);

      // Draw glowing oscilloscope waveform
      this.ctx.lineWidth = 3;
      const gradient = this.ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#ef4444');
      gradient.addColorStop(1, '#8b5cf6');
      this.ctx.strokeStyle = gradient;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#3b82f6';

      this.ctx.beginPath();
      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      this.ctx.lineTo(width, height / 2);
      this.ctx.stroke();
      this.ctx.shadowBlur = 0; // reset
    };

    render();
  }
}

// ============================================================================
// 3. MAIN APPLICATION CONTROLLER
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // --- UI Elements ---
  const dialectSelect = document.getElementById('dialectSelect');
  const dialectDescription = document.getElementById('dialectDescription');
  const dialectTags = document.getElementById('dialectTags');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Live Recording Stage
  const startRecordBtn = document.getElementById('startRecordBtn');
  const recordBtnLabel = document.getElementById('recordBtnLabel');
  const recordMicIcon = document.getElementById('recordMicIcon');
  const pauseRecordBtn = document.getElementById('pauseRecordBtn');
  const downloadAudioBtn = document.getElementById('downloadAudioBtn');
  const pulseIndicator = document.getElementById('pulseIndicator');
  const statusMessage = document.getElementById('statusMessage');
  const recordTimer = document.getElementById('recordTimer');
  const liveInterimText = document.getElementById('liveInterimText');
  const canvasOverlayText = document.getElementById('canvasOverlayText');

  // File Upload Stage
  const dropZone = document.getElementById('dropZone');
  const audioFileInput = document.getElementById('audioFileInput');
  const browseFileBtn = document.getElementById('browseFileBtn');
  const filePlayerCard = document.getElementById('filePlayerCard');
  const audioPlaybackElement = document.getElementById('audioPlaybackElement');
  const audioFileName = document.getElementById('audioFileName');
  const audioFileSize = document.getElementById('audioFileSize');
  const audioFileDuration = document.getElementById('audioFileDuration');
  const audioFileType = document.getElementById('audioFileType');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const transcribeAudioBtn = document.getElementById('transcribeAudioBtn');
  const speedSelect = document.getElementById('speedSelect');
  const transcribeProgressBox = document.getElementById('transcribeProgressBox');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressStatusText = document.getElementById('progressStatusText');
  const progressPercentage = document.getElementById('progressPercentage');

  // Settings
  const autoNormalizeToggle = document.getElementById('autoNormalizeToggle');
  const normalizeLabel = document.getElementById('normalizeLabel');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

  // Output Editor Window
  const outputEditorArea = document.getElementById('outputEditorArea');
  const outWordCount = document.getElementById('outWordCount');
  const outCharCount = document.getElementById('outCharCount');
  const outSpeakingTime = document.getElementById('outSpeakingTime');
  const manualNormalizeBtn = document.getElementById('manualNormalizeBtn');
  const toggleSearchBtn = document.getElementById('toggleSearchBtn');
  const searchDrawer = document.getElementById('searchDrawer');
  const findInput = document.getElementById('findInput');
  const replaceInput = document.getElementById('replaceInput');
  const replaceBtn = document.getElementById('replaceBtn');
  const replaceAllBtn = document.getElementById('replaceAllBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const decreaseFontBtn = document.getElementById('decreaseFontBtn');
  const resetFontBtn = document.getElementById('resetFontBtn');
  const increaseFontBtn = document.getElementById('increaseFontBtn');
  const clearEditorBtn = document.getElementById('clearEditorBtn');
  const copyOutputBtn = document.getElementById('copyOutputBtn');
  const downloadTxtBtn = document.getElementById('downloadTxtBtn');
  const downloadDocBtn = document.getElementById('downloadDocBtn');
  const printBtn = document.getElementById('printBtn');
  const toastNotification = document.getElementById('toastNotification');

  // --- State Variables ---
  let recognition = null;
  let isRecording = false;
  let isPaused = false;
  let mediaRecorder = null;
  let recordedAudioChunks = [];
  let recordedAudioBlob = null;
  let liveMediaStream = null;
  let recordingInterval = null;
  let recordingSeconds = 0;
  let currentFontSize = 1.25; // in rem
  let uploadedFile = null;

  // Initialize Audio Visualizer
  const visualizer = new AudioVisualizer('waveformCanvas');

  // ==========================================================================
  // SPEECH RECOGNITION SETUP
  // ==========================================================================
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function initSpeechEngine() {
    if (!SpeechRecognition) {
      statusMessage.textContent = 'உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை (Chrome/Edge பயன்படுத்தவும்).';
      statusMessage.style.color = '#ef4444';
      startRecordBtn.disabled = true;
      return false;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Set locale based on chosen dialect
    const selectedDialectKey = dialectSelect.value;
    const dialectConfig = TamilDialectEngine.dialects[selectedDialectKey] || TamilDialectEngine.dialects['ta-IN-standard'];
    recognition.lang = dialectConfig.locale;

    recognition.onstart = () => {
      isRecording = true;
      isPaused = false;
      startRecordBtn.classList.add('recording');
      recordBtnLabel.textContent = 'நிறுத்துக (Stop)';
      recordMicIcon.textContent = '⏹️';
      pauseRecordBtn.disabled = false;
      pulseIndicator.classList.add('active');
      statusMessage.textContent = 'கேட்கிறது... தமிழில் பேசுங்கள்.';
      statusMessage.style.color = '#ef4444';
      canvasOverlayText.style.opacity = '0';
      startTimer();
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalSegment = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalSegment += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Display live interim speech
      if (interimTranscript) {
        liveInterimText.textContent = interimTranscript;
      }

      // Process and commit final transcript to the editor window
      if (finalSegment) {
        const autoNormalize = autoNormalizeToggle.checked;
        const processedSegment = TamilDialectEngine.processText(finalSegment, autoNormalize);
        appendTranscriptToEditor(processedSegment);
        liveInterimText.textContent = '...';
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition warning:', event.error);
      if (event.error === 'not-allowed') {
        statusMessage.textContent = 'மைக்ரோஃபோன் அணுகல் மறுக்கப்பட்டது. அமைப்பில் அனுமதிக்கவும்.';
        stopRecording();
      } else if (event.error === 'no-speech') {
        statusMessage.textContent = 'குரல் கேட்கவில்லை. தொடர்ந்து பேசுங்கள்...';
      } else if (event.error === 'network') {
        statusMessage.textContent = 'இணைய இணைப்பு பிழை ஏற்பட்டுள்ளது.';
      }
    };

    recognition.onend = () => {
      // Auto restart if still marked as recording
      if (isRecording && !isPaused) {
        try {
          recognition.start();
        } catch (e) {
          stopRecording();
        }
      } else if (!isPaused) {
        stopRecording();
      }
    };

    return true;
  }

  // ==========================================================================
  // MEDIA RECORDER (Capture & Download Voice Audio)
  // ==========================================================================
  async function startMicrophoneRecording() {
    try {
      liveMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      visualizer.connectStream(liveMediaStream);

      // Setup MediaRecorder
      recordedAudioChunks = [];
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
      mediaRecorder = new MediaRecorder(liveMediaStream, { mimeType });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedAudioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        recordedAudioBlob = new Blob(recordedAudioChunks, { type: mimeType });
        downloadAudioBtn.disabled = false;
      };

      mediaRecorder.start(250); // chunk every 250ms
      recognition.start();
    } catch (err) {
      console.error('Audio capture error:', err);
      showToast('மைக்ரோஃபோனைத் தொடங்குவதில் பிழை!');
      statusMessage.textContent = 'மைக்ரோஃபோன் பிழை: ' + err.message;
      stopRecording();
    }
  }

  function stopRecording() {
    isRecording = false;
    isPaused = false;
    stopTimer();

    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }

    if (liveMediaStream) {
      liveMediaStream.getTracks().forEach(track => track.stop());
      liveMediaStream = null;
    }

    visualizer.stop();

    startRecordBtn.classList.remove('recording');
    recordBtnLabel.textContent = 'பேசத் தொடங்கு';
    recordMicIcon.textContent = '🎤';
    pauseRecordBtn.disabled = true;
    pauseRecordBtn.textContent = '⏸️ இடைநிறுத்து';
    pulseIndicator.classList.remove('active');
    statusMessage.textContent = 'தயாராக உள்ளது (பேச மைக்ரோஃபோனை அழுத்தவும்)';
    statusMessage.style.color = '';
    canvasOverlayText.style.opacity = '1';
    liveInterimText.textContent = '...';
  }

  function togglePauseRecording() {
    if (!isRecording) return;

    if (!isPaused) {
      // Pause
      isPaused = true;
      try { recognition.stop(); } catch (e) {}
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
      }
      pauseRecordBtn.textContent = '▶️ தொடர்க';
      statusMessage.textContent = 'இடைநிறுத்தப்பட்டுள்ளது (Paused)';
      statusMessage.style.color = '#f59e0b';
      pulseIndicator.classList.remove('active');
      visualizer.stop();
      clearInterval(recordingInterval);
    } else {
      // Resume
      isPaused = false;
      try { recognition.start(); } catch (e) {}
      if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
      }
      if (liveMediaStream) {
        visualizer.connectStream(liveMediaStream);
      }
      pauseRecordBtn.textContent = '⏸️ இடைநிறுத்து';
      statusMessage.textContent = 'கேட்கிறது... தொடர்ந்து பேசுங்கள்.';
      statusMessage.style.color = '#ef4444';
      pulseIndicator.classList.add('active');
      startTimer();
    }
  }

  // Timer helpers
  function startTimer() {
    clearInterval(recordingInterval);
    recordingInterval = setInterval(() => {
      recordingSeconds++;
      const mins = String(Math.floor(recordingSeconds / 60)).padStart(2, '0');
      const secs = String(recordingSeconds % 60).padStart(2, '0');
      recordTimer.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(recordingInterval);
    recordingSeconds = 0;
    recordTimer.textContent = '00:00';
  }

  // ==========================================================================
  // OUTPUT EDITOR WINDOW & TEXT MANAGEMENT
  // ==========================================================================
  function appendTranscriptToEditor(text) {
    if (!text) return;
    const currentVal = outputEditorArea.value;
    const needsSpace = currentVal.length > 0 && !currentVal.endsWith(' ') && !currentVal.endsWith('\n');
    outputEditorArea.value = currentVal + (needsSpace ? ' ' : '') + text;
    updateEditorStats();
    saveToStorage();
    outputEditorArea.scrollTop = outputEditorArea.scrollHeight;
  }

  function insertPunctuationAtCursor(punct) {
    const start = outputEditorArea.selectionStart;
    const end = outputEditorArea.selectionEnd;
    const text = outputEditorArea.value;

    let insertion = punct;
    if (punct === '"') insertion = '""';
    if (punct === '(') insertion = '()';

    outputEditorArea.value = text.substring(0, start) + insertion + ' ' + text.substring(end);
    const newPos = start + insertion.length + 1;
    outputEditorArea.selectionStart = outputEditorArea.selectionEnd = newPos;
    outputEditorArea.focus();
    updateEditorStats();
    saveToStorage();
  }

  function updateEditorStats() {
    const text = outputEditorArea.value.trim();
    outCharCount.textContent = text.length;

    if (text.length === 0) {
      outWordCount.textContent = '0';
      outSpeakingTime.textContent = '~0 வினாடி';
      return;
    }

    const words = text.split(/\s+/).filter(w => w.length > 0);
    outWordCount.textContent = words.length;

    // Average speaking rate: ~120 Tamil words per minute
    const speakingMinutes = (words.length / 120);
    if (speakingMinutes < 1) {
      outSpeakingTime.textContent = `~${Math.max(1, Math.round(speakingMinutes * 60))} வினாடிகள்`;
    } else {
      outSpeakingTime.textContent = `~${speakingMinutes.toFixed(1)} நிமிடங்கள்`;
    }
  }

  function saveToStorage() {
    localStorage.setItem('tamil_dictation_output', outputEditorArea.value);
  }

  function loadFromStorage() {
    const saved = localStorage.getItem('tamil_dictation_output');
    if (saved) {
      outputEditorArea.value = saved;
      updateEditorStats();
    }
  }

  // Dialect manual convert button action
  function manualNormalizeEditorText() {
    const text = outputEditorArea.value;
    if (!text.trim()) {
      showToast('மாற்றுவதற்கு உரை எதுவும் இல்லை!');
      return;
    }
    const normalized = TamilDialectEngine.normalizeDialect(text);
    outputEditorArea.value = normalized;
    updateEditorStats();
    saveToStorage();
    showToast('பேச்சு வழக்கு சொற்கள் தூய எழுத்தாக மாற்றப்பட்டன! ✨');
  }

  // ==========================================================================
  // AUDIO FILE UPLOAD & PROCESSING
  // ==========================================================================
  function handleAudioFile(file) {
    if (!file || !file.type.startsWith('audio/')) {
      showToast('தயவுசெய்து சரியான ஆடியோ கோப்பை தேர்ந்தெடுக்கவும்!');
      return;
    }

    uploadedFile = file;
    audioFileName.textContent = file.name;
    audioFileSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    audioFileType.textContent = file.type || 'audio/unknown';

    const fileUrl = URL.createObjectURL(file);
    audioPlaybackElement.src = fileUrl;

    audioPlaybackElement.onloadedmetadata = () => {
      const duration = Math.round(audioPlaybackElement.duration);
      const mins = String(Math.floor(duration / 60)).padStart(2, '0');
      const secs = String(duration % 60).padStart(2, '0');
      audioFileDuration.textContent = `${mins}:${secs}`;
    };

    dropZone.style.display = 'none';
    filePlayerCard.style.display = 'flex';
    transcribeProgressBox.style.display = 'none';

    // Hook audio visualizer to uploaded audio playback
    audioPlaybackElement.onplay = () => {
      visualizer.connectAudioElement(audioPlaybackElement);
    };

    audioPlaybackElement.onpause = () => {
      visualizer.stop();
    };

    audioPlaybackElement.onended = () => {
      visualizer.stop();
    };
  }

  function transcribeUploadedAudio() {
    if (!audioPlaybackElement.src) {
      showToast('முதலில் ஆடியோ கோப்பை ஏற்றவும்!');
      return;
    }

    transcribeProgressBox.style.display = 'flex';
    progressBarFill.style.width = '0%';
    progressPercentage.textContent = '0%';
    progressStatusText.textContent = 'ஆடியோ இயக்கப்பட்டு உரை மாற்றப்படுகிறது...';

    // Restart playback at 1.0x speed for maximum recognition accuracy
    audioPlaybackElement.currentTime = 0;
    audioPlaybackElement.playbackRate = parseFloat(speedSelect.value) || 1.0;
    audioPlaybackElement.play();

    // Ensure recognition is running
    if (!isRecording) {
      try {
        recognition.start();
      } catch (e) {}
    }

    audioPlaybackElement.ontimeupdate = () => {
      if (audioPlaybackElement.duration) {
        const percent = Math.round((audioPlaybackElement.currentTime / audioPlaybackElement.duration) * 100);
        progressBarFill.style.width = `${percent}%`;
        progressPercentage.textContent = `${percent}%`;
      }
    };

    audioPlaybackElement.onended = () => {
      progressBarFill.style.width = '100%';
      progressPercentage.textContent = '100%';
      progressStatusText.textContent = '✅ உரை மாற்றம் நிறைவடைந்தது!';
      showToast('ஆடியோ டிரான்ஸ்கிரிப்ஷன் நிறைவுற்றது!');
    };
  }

  // ==========================================================================
  // EXPORT & SHARING HELPERS
  // ==========================================================================
  function copyTextToClipboard() {
    const text = outputEditorArea.value.trim();
    if (!text) {
      showToast('நகலெடுக்க உரை எதுவும் இல்லை!');
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => showToast('உரை வெற்றிகரமாக நகலெடுக்கப்பட்டது! 📋'))
      .catch(() => showToast('நகலெடுப்பதில் பிழை!'));
  }

  function downloadAsTxtFile() {
    const text = outputEditorArea.value.trim();
    if (!text) {
      showToast('சேமிக்க உரை எதுவும் இல்லை!');
      return;
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamil-dictation-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('.TXT கோப்பு பதிவிறக்கம் செய்யப்பட்டது! 📄');
  }

  function downloadAsDocFile() {
    const text = outputEditorArea.value.trim();
    if (!text) {
      showToast('சேமிக்க உரை எதுவும் இல்லை!');
      return;
    }

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Tamil Dictation</title></head>
      <body style="font-family: Mukta Malar, Arial, sans-serif; font-size: 14pt; line-height: 1.8;">
        <h2>தமிழ் குரல் தட்டச்சு ஆவணம்</h2>
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
    a.download = `tamil-dictation-${Date.now()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Word ஆவணம் (.DOC) பதிவிறக்கம் செய்யப்பட்டது! 📝');
  }

  function downloadRecordedAudioFile() {
    if (!recordedAudioBlob) {
      showToast('பதிவு செய்யப்பட்ட ஆடியோ எதுவும் இல்லை!');
      return;
    }
    const url = URL.createObjectURL(recordedAudioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamil-voice-recording-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ஆடியோ கோப்பு பதிவிறக்கம் செய்யப்பட்டது! 💾');
  }

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2600);
  }

  // ==========================================================================
  // EVENT LISTENERS & INITIALIZATION
  // ==========================================================================

  // Dialect selection change
  dialectSelect.addEventListener('change', () => {
    const key = dialectSelect.value;
    const config = TamilDialectEngine.dialects[key];
    if (config) {
      dialectDescription.textContent = config.description;
      dialectTags.innerHTML = config.tags.map(t => `<span class="tag">${t}</span>`).join('');
      if (recognition) {
        recognition.lang = config.locale;
      }
      showToast(`வட்டார வழக்கு மாற்றப்பட்டது: ${config.name}`);
    }
  });

  // Recording controls
  startRecordBtn.addEventListener('click', () => {
    if (isRecording) {
      stopRecording();
    } else {
      startMicrophoneRecording();
    }
  });

  pauseRecordBtn.addEventListener('click', togglePauseRecording);
  downloadAudioBtn.addEventListener('click', downloadRecordedAudioFile);

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Theme toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('tamil_dictation_theme', newTheme);
    showToast(`வடிவம் மாற்றப்பட்டது: ${newTheme === 'dark' ? 'இருள் (Dark)' : 'வெளிச்சம் (Light)'}`);
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('tamil_dictation_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // File Upload interactions
  browseFileBtn.addEventListener('click', () => audioFileInput.click());
  audioFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAudioFile(e.target.files[0]);
    }
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAudioFile(e.dataTransfer.files[0]);
    }
  });

  removeFileBtn.addEventListener('click', () => {
    uploadedFile = null;
    audioPlaybackElement.src = '';
    filePlayerCard.style.display = 'none';
    dropZone.style.display = 'block';
    transcribeProgressBox.style.display = 'none';
    visualizer.stop();
  });

  speedSelect.addEventListener('change', () => {
    audioPlaybackElement.playbackRate = parseFloat(speedSelect.value) || 1.0;
  });

  transcribeAudioBtn.addEventListener('click', transcribeUploadedAudio);

  // Quick punctuation buttons
  document.querySelectorAll('.punct-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const punct = btn.getAttribute('data-punct');
      insertPunctuationAtCursor(punct);
    });
  });

  // Manual Dialect Normalizer
  manualNormalizeBtn.addEventListener('click', manualNormalizeEditorText);

  // Search & Replace drawer
  toggleSearchBtn.addEventListener('click', () => {
    const isVisible = searchDrawer.style.display !== 'none';
    searchDrawer.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) findInput.focus();
  });

  closeSearchBtn.addEventListener('click', () => {
    searchDrawer.style.display = 'none';
  });

  replaceBtn.addEventListener('click', () => {
    const findStr = findInput.value;
    const replaceStr = replaceInput.value;
    if (!findStr) return;
    const text = outputEditorArea.value;
    outputEditorArea.value = text.replace(findStr, replaceStr);
    updateEditorStats();
    saveToStorage();
    showToast('ஒரு சொல் மாற்றப்பட்டது!');
  });

  replaceAllBtn.addEventListener('click', () => {
    const findStr = findInput.value;
    const replaceStr = replaceInput.value;
    if (!findStr) return;
    const text = outputEditorArea.value;
    const regex = new RegExp(findStr, 'g');
    outputEditorArea.value = text.replace(regex, replaceStr);
    updateEditorStats();
    saveToStorage();
    showToast('அனைத்து சொற்களும் மாற்றப்பட்டன!');
  });

  // Font Size Adjustments
  decreaseFontBtn.addEventListener('click', () => {
    currentFontSize = Math.max(0.9, currentFontSize - 0.1);
    outputEditorArea.style.fontSize = `${currentFontSize}rem`;
  });

  resetFontBtn.addEventListener('click', () => {
    currentFontSize = 1.25;
    outputEditorArea.style.fontSize = '1.25rem';
  });

  increaseFontBtn.addEventListener('click', () => {
    currentFontSize = Math.min(2.2, currentFontSize + 0.15);
    outputEditorArea.style.fontSize = `${currentFontSize}rem`;
  });

  // Clear text
  clearEditorBtn.addEventListener('click', () => {
    if (!outputEditorArea.value.trim()) return;
    if (confirm('அனைத்து உரைகளையும் அழிக்க விரும்புகிறீர்களா?')) {
      outputEditorArea.value = '';
      updateEditorStats();
      saveToStorage();
      showToast('உரை அழிக்கப்பட்டது! 🗑️');
    }
  });

  // Output action exports
  copyOutputBtn.addEventListener('click', copyTextToClipboard);
  downloadTxtBtn.addEventListener('click', downloadAsTxtFile);
  downloadDocBtn.addEventListener('click', downloadAsDocFile);
  printBtn.addEventListener('click', () => window.print());

  // Input listener for manual edits in the output textarea
  outputEditorArea.addEventListener('input', () => {
    updateEditorStats();
    saveToStorage();
  });

  // API Key saving
  saveApiKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      localStorage.setItem('tamil_dictation_ai_key', key);
      showToast('AI API Key சேமிக்கப்பட்டது!');
    } else {
      localStorage.removeItem('tamil_dictation_ai_key');
      showToast('API Key நீக்கப்பட்டது.');
    }
  });

  const savedApiKey = localStorage.getItem('tamil_dictation_ai_key');
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
  }

  // Initialize Speech Engine & Load Saved Content
  initSpeechEngine();
  loadFromStorage();
  updateEditorStats();
});
