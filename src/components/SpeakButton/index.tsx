import React, {useEffect, useState} from 'react';

import styles from './speakButton.module.css';

type SpeakButtonProps = {
  text: string;
};

export default function SpeakButton({text}: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    utterance.voice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase() === 'en-us') ?? null;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      aria-label={`Listen to: ${text}`}
      aria-pressed={isSpeaking}
      className={`${styles.button} ${isSpeaking ? styles.speaking : ''}`}
      onClick={speak}
      title="Listen in American English"
      type="button">
      <span aria-hidden="true">🔊</span>
    </button>
  );
}
