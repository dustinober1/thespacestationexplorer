import React from 'react';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import TexturedPlanet from './TexturedPlanet';

describe('TexturedPlanet', () => {
  it('should render without crashing', () => {
    const planet = {
      id: 'earth',
      name: 'Earth',
      diameter: 12742,
      color: '#4169E1',
    };

    const { container } = render(
      <Canvas>
        <TexturedPlanet planet={planet} />
      </Canvas>
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
