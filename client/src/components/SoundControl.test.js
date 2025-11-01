import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SoundProvider } from '../utils/SoundManager';
import SoundControl from './SoundControl';

describe('SoundControl', () => {
  it('should render and toggle mute', () => {
    const { getByLabelText, queryByLabelText } = render(
      <SoundProvider>
        <SoundControl />
      </SoundProvider>
    );

    const muteButton = getByLabelText('Mute sound');
    expect(muteButton).toBeInTheDocument();

    fireEvent.click(muteButton);

    const unmuteButton = getByLabelText('Unmute sound');
    expect(unmuteButton).toBeInTheDocument();
    expect(queryByLabelText('Adjust volume')).not.toBeInTheDocument();
  });

  it('should adjust volume', () => {
    const { getByLabelText } = render(
      <SoundProvider>
        <SoundControl />
      </SoundProvider>
    );

    const volumeSlider = getByLabelText('Adjust volume');
    expect(volumeSlider).toBeInTheDocument();

    fireEvent.change(volumeSlider, { target: { value: '0.8' } });
    expect(volumeSlider.value).toBe('0.8');
  });
});
