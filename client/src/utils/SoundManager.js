import React, { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Create SoundContext
const SoundContext = createContext();

// Sound manager hook
export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

// Sound provider component
export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default to 30% volume to prevent loud sounds
  
  // Audio elements will be created as needed
  const audioRefs = useRef({});

  // Function to play a sound
  const playSound = async (soundType, options = {}) => {
    if (isMuted) return;
    
    try {
      // For a production app, we would load actual sound files
      // For now, we'll just log the action and potentially create a simple tone using Web Audio API
      
      console.log(`Playing sound: ${soundType}`);
      
      // Use Web Audio API to generate simple tones for different sound types
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create different tones for different actions
        let frequency = 440; // Default A4 note
        let duration = 0.2; // Default duration in seconds
        
        switch(soundType) {
          case 'planetSelect':
            frequency = 523.25; // C5
            duration = 0.3;
            break;
          case 'hover':
            frequency = 659.25; // E5
            duration = 0.1;
            break;
          case 'zoom':
            frequency = 392.00; // G4
            duration = 0.4;
            break;
          case 'spaceStation':
            frequency = 349.23; // F4
            duration = 0.5;
            break;
          case 'background':
            // For background we might want a continuous ambient sound
            frequency = 110; // A2
            duration = 1.0;
            break;
          default:
            frequency = 440;
            duration = 0.2;
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = options.type || 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = volume;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        oscillator.stop(audioContext.currentTime + duration);
      }
    } catch (error) {
      console.warn(`Could not play sound: ${soundType}`, error);
    }
  };

  // Function to toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Function to set volume
  const setSoundVolume = (newVolume) => {
    // Volume should be between 0 and 1
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  };

  const value = {
    isMuted,
    volume,
    playSound,
    toggleMute,
    setSoundVolume
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

SoundProvider.propTypes = {
  children: PropTypes.node.isRequired
};