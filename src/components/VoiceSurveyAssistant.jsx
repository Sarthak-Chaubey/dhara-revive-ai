// VoiceSurveyAssistant.jsx - Voice-Enabled Field Surveyor & Multilingual Speech Interface
// Supports Web Speech API for Hindi & English verbal spring indicator inputs (SIH26240 Remote Hill Field Utility)

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export default function VoiceSurveyAssistant({ onApplyVoiceValues, currentIndicators }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceFeedback, setVoiceFeedback] = useState('Click "Start Voice Input" and speak indicators in English or Hindi (e.g., "Slope 20 degree", "Barish deficit 40 percent", "Forest loss 30")');
  const [recognizedParams, setRecognizedParams] = useState({});
  const [speechSupported, setSpeechSupported] = useState(true);
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
  const [languageMode, setLanguageMode] = useState('hi-IN'); // 'hi-IN' or 'en-IN'

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setVoiceFeedback('Web Speech API is not supported in this browser. You can type commands below.');
    }
  }, []);

  const speakText = (text) => {
    if (!audioFeedbackEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.lang = languageMode === 'hi-IN' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = languageMode;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceFeedback('Listening... Please speak (e.g. "Slope 15 degree, Rainfall deficit 35 percent")');
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        parseVoiceCommands(text);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setVoiceFeedback(`Audio recognition paused: ${event.error || 'Please speak clearly'}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      setVoiceFeedback('Microphone permission required or browser audio blocked.');
    }
  };

  // Natural Language Command Parser (Handles both Hindi & English phonetic numbers)
  const parseVoiceCommands = (text) => {
    const lower = text.toLowerCase();
    const detected = {};
    let feedbackParts = [];

    // Helper regex to extract number after keyword
    const extractNumber = (patterns) => {
      for (const p of patterns) {
        const match = lower.match(p);
        if (match && match[1]) {
          return parseFloat(match[1]);
        }
      }
      return null;
    };

    // 1. Slope / Dhalan
    const slopeVal = extractNumber([
      /(?:slope|dhalan|gradient|degree)\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i,
      /(\d+(?:\.\d+)?)\s*(?:degree|deg|%)?\s*(?:slope|dhalan)/i
    ]);
    if (slopeVal !== null) {
      const clamped = Math.max(0, Math.min(60, slopeVal));
      detected.slope = clamped;
      feedbackParts.push(`Slope: ${clamped}°`);
    }

    // 2. Rainfall Deficit / Barish
    const rainVal = extractNumber([
      /(?:rainfall|rain|barish|deficit|barsaat)\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i,
      /(\d+(?:\.\d+)?)\s*(?:percent|%)\s*(?:rainfall|rain|barish)/i
    ]);
    if (rainVal !== null) {
      const clamped = Math.max(0, Math.min(100, rainVal));
      detected.rainfallDeficit = clamped;
      feedbackParts.push(`Rainfall Deficit: ${clamped}%`);
    }

    // 3. Forest Loss / Jungle katav
    const forestVal = extractNumber([
      /(?:forest loss|forest|jungle|ped|van)\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i,
      /(\d+(?:\.\d+)?)\s*(?:percent|%)\s*(?:forest loss|jungle)/i
    ]);
    if (forestVal !== null) {
      const clamped = Math.max(0, Math.min(100, forestVal));
      detected.forestLoss = clamped;
      feedbackParts.push(`Forest Loss: ${clamped}%`);
    }

    // 4. Lineament / Fracture / Darare
    const lineamentVal = extractNumber([
      /(?:lineament|fracture|darar|crack)\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i
    ]);
    if (lineamentVal !== null) {
      const clamped = Math.max(0, Math.min(1, lineamentVal > 1 ? lineamentVal / 100 : lineamentVal));
      detected.lineamentDensity = clamped;
      feedbackParts.push(`Lineament: ${clamped}`);
    }

    // 5. NDVI / Hariyali
    const ndviVal = extractNumber([
      /(?:ndvi|vegetation|hariyali)\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i
    ]);
    if (ndviVal !== null) {
      const clamped = Math.max(0, Math.min(1, ndviVal > 1 ? ndviVal / 100 : ndviVal));
      detected.ndvi = clamped;
      feedbackParts.push(`NDVI: ${clamped}`);
    }

    setRecognizedParams(detected);

    if (Object.keys(detected).length > 0) {
      const reply = `Recognized: ${feedbackParts.join(', ')}. Applying to scoring engine!`;
      setVoiceFeedback(reply);
      speakText(languageMode === 'hi-IN' ? `Aapke indicators update ho gaye hain: ${feedbackParts.join(', ')}` : reply);
      if (onApplyVoiceValues) {
        onApplyVoiceValues(detected);
      }
    } else {
      const errMsg = `Heard: "${text}". Could not recognize numbers. Try saying: "Slope 20 degree, Rainfall 30 percent".`;
      setVoiceFeedback(errMsg);
      speakText(languageMode === 'hi-IN' ? 'Kripya dubara bolein, jaise: Slope 20 degree ya Barish 30 percent' : 'Please repeat with number, such as Slope 20 degree');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Multilingual Voice Surveyor (Web Speech API)</span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Hands-Free Speech Form Assistant</span>
          </h3>
          <p className="text-xs text-slate-400">
            Field workers in tribal hills can speak indicators in Hindi or English without typing on phone keyboards.
          </p>
        </div>

        {/* Language & Audio Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center space-x-1 text-xs border border-slate-700">
            <button
              onClick={() => setLanguageMode('hi-IN')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                languageMode === 'hi-IN' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setLanguageMode('en-IN')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                languageMode === 'en-IN' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setAudioFeedbackEnabled(!audioFeedbackEnabled)}
            title={audioFeedbackEnabled ? 'Voice feedback ON' : 'Voice feedback OFF'}
            className={`p-2 rounded-xl border transition-colors ${
              audioFeedbackEnabled ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {audioFeedbackEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Voice Trigger & Feedback Display */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Big Mic Button (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`relative p-5 rounded-full transition-all shadow-xl cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 hover:scale-105'
            }`}
          >
            {isListening ? (
              <>
                <span className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping" />
                <Mic className="w-7 h-7" />
              </>
            ) : (
              <Mic className="w-7 h-7" />
            )}
          </button>
          <span className="mt-2.5 text-xs font-bold text-white">
            {isListening ? 'Listening to speech...' : 'Click to Speak Indicators'}
          </span>
          <span className="text-[11px] text-slate-400">
            {languageMode === 'hi-IN' ? 'बोलो: "Slope 20 degree, Barish 40%"' : 'Say: "Slope 15 degree, Rainfall 30%"'}
          </span>
        </div>

        {/* Live Feedback & Detected Values (8 cols) */}
        <div className="md:col-span-8 flex flex-col justify-between p-4 bg-slate-950/70 border border-slate-800 rounded-xl h-full space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">Speech Recognition Status:</span>
              {transcript && <span className="text-emerald-400 font-mono text-[11px]">Transcript Captured</span>}
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 min-h-[48px] flex items-center">
              {transcript ? (
                <span>&ldquo;{transcript}&rdquo;</span>
              ) : (
                <span className="text-slate-500 italic">No audio recorded yet. Tap microphone and speak.</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">{voiceFeedback}</span>
          </div>

          {/* Preset Quick Voice Simulation Buttons */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-slate-400 font-semibold mr-1">Sample Voice Inputs:</span>
            <button
              onClick={() => parseVoiceCommands('slope 25 degree and rainfall deficit 45 percent and forest loss 30')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              &ldquo;Slope 25°, Rain 45%, Forest 30%&rdquo;
            </button>
            <button
              onClick={() => parseVoiceCommands('dhalan 10 degree aur barish deficit 15 percent')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              &ldquo;Dhalan 10°, Barish 15%&rdquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
