import { render, screen } from '@testing-library/react';
import PlanetInfo from './PlanetInfo';

const mockPlanet = {
  name: 'Mars',
  description: 'The Red Planet',
  diameter: 6779,
  mass: '6.39 × 10^23 kg',
  distanceFromSun: 227.9,
  orbitalPeriod: 687,
  rotationPeriod: 24.6,
  moons: [{ name: 'Phobos' }, { name: 'Deimos' }],
  facts: ['Fact 1', 'Fact 2'],
};

test('renders planet information correctly', () => {
  render(<PlanetInfo planet={mockPlanet} />);

  expect(screen.getByText('Mars')).toBeInTheDocument();
  expect(screen.getByText('The Red Planet')).toBeInTheDocument();
  expect(screen.getByText('6,779 km')).toBeInTheDocument();
  expect(screen.getByText('6.39 × 10^23 kg')).toBeInTheDocument();
  expect(screen.getByText('227.9 million km')).toBeInTheDocument();
  expect(screen.getByText('687 Earth days')).toBeInTheDocument();
  expect(screen.getByText('24.6 hours')).toBeInTheDocument();
  expect(screen.getByText('Phobos, Deimos')).toBeInTheDocument();
  expect(screen.getByText('Fact 1')).toBeInTheDocument();
  expect(screen.getByText('Fact 2')).toBeInTheDocument();
});
