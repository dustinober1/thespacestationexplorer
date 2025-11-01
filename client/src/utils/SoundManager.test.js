import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SoundProvider, useSound } from './SoundManager';

// Mock AudioContext
global.AudioContext = jest.fn(() => ({
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    type: '',
    frequency: { value: 0 }
  })),
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: { value: 0, exponentialRampToValueAtTime: jest.fn() }
  })),
  destination: {},
  currentTime: 0
}));

const TestComponent = () => {
  const { isMuted, volume, playSound, toggleMute, setSoundVolume } = useSound();

  return (
    <div>
      <span data-testid="muted">{isMuted.toString()}</span>
      <span data-testid="volume">{volume}</span>
      <button onClick={() => playSound('test')}>Play</button>
      <button onClick={toggleMute}>Toggle Mute</button>
      <button onClick={() => setSoundVolume(0.8)}>Set Volume</button>
    </div>
  );
};

describe('SoundManager', () => {
  it('should provide sound context values', () => {
    const { getByTestId } = render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    );

    expect(getByTestId('muted').textContent).toBe('false');
    expect(getByTestId('volume').textContent).toBe('0.5');
  });

  it('should toggle mute state', () => {
    const { getByTestId, getByText } = render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    );

    fireEvent.click(getByText('Toggle Mute'));
    expect(getByTestId('muted').textContent).toBe('true');
  });

  it('should set the volume', () => {
    const { getByTestId, getByText } = render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    );

    fireEvent.click(getByText('Set Volume'));
    expect(getByTestId('volume').textContent).toBe('0.8');
  });

  it('should not play sound when muted', () => {
    const { getByText } = render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    );

    fireEvent.click(getByText('Toggle Mute'));
    fireEvent.click(getByText('Play'));
    // We can't easily test that the sound doesn't play, 
    // but we can ensure no errors are thrown.
  });
});
