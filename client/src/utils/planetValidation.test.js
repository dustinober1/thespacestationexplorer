import { validatePlanet, validatePlanetsData } from './planetValidation';

describe('Planet Validation', () => {
  const validPlanet = {
    id: 'earth',
    name: 'Earth',
    description: 'Our home planet',
    diameter: 12742,
    color: '#4169E1'
  };

  it('should validate a correct planet object', () => {
    const errors = validatePlanet(validPlanet);
    expect(errors.length).toBe(0);
  });

  it('should return an error for a missing id', () => {
    const planet = { ...validPlanet, id: undefined };
    const errors = validatePlanet(planet);
    expect(errors).toContain('Planet id is required and must be a string');
  });

  it('should return an error for a non-string name', () => {
    const planet = { ...validPlanet, name: 123 };
    const errors = validatePlanet(planet);
    expect(errors).toContain('Planet name is required and must be a string');
  });

  it('should return an error for a non-numeric diameter', () => {
    const planet = { ...validPlanet, diameter: 'big' };
    const errors = validatePlanet(planet);
    expect(errors).toContain('Planet diameter is required and must be a positive number');
  });

  it('should validate an array of planets', () => {
    const planets = [validPlanet, { ...validPlanet, id: 'mars', name: 'Mars' }];
    const results = validatePlanetsData(planets);
    expect(results.every(r => r.isValid)).toBe(true);
  });

  it('should return errors for an invalid array of planets', () => {
    const planets = [validPlanet, { name: 'Mars' }];
    const results = validatePlanetsData(planets);
    expect(results[1].isValid).toBe(false);
    expect(results[1].errors).toContain('Planet id is required and must be a string');
  });
});
