import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlanetSelector from './PlanetSelector';

describe('PlanetSelector', () => {
  it('should render planets and handle selection', () => {
    const onSelectPlanet = jest.fn();
    const planets = [
      { id: 'earth', name: 'Earth', color: '#4169E1' },
      { id: 'mars', name: 'Mars', color: '#CD5C5C', type: 'dwarf planet' },
    ];
    const { getByText } = render(
      <PlanetSelector planets={planets} selectedPlanet={planets[0]} onSelectPlanet={onSelectPlanet} />
    );

    expect(getByText('Earth')).toBeInTheDocument();
    expect(getByText('Mars')).toBeInTheDocument();

    fireEvent.click(getByText('Mars'));
    expect(onSelectPlanet).toHaveBeenCalledWith('mars');
  });
});
