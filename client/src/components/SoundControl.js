import React from 'react';
import { useSound } from '../utils/SoundManager';
import './SoundControl.css';
import PropTypes from 'prop-types';

/**
 * SoundControl component provides UI for sound management
 */
function SoundControl() {
  const { isMuted, volume, toggleMute, setSoundVolume } = useSound();

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setSoundVolume(newVolume);
  };

  return (
    <div className="sound-control">
      <button 
        className="sound-toggle" 
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      
      {!isMuted && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Adjust volume"
        />
      )}
    </div>
  );
}

SoundControl.propTypes = {
  // No props needed, uses context
};

export default SoundControl;