import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render and handle input', () => {
    const onSearch = jest.fn();
    const planets = [
      { id: 'earth', name: 'Earth', description: 'Our home planet' },
      { id: 'mars', name: 'Mars', description: 'The Red Planet' },
    ];
    const { getByPlaceholderText } = render(<SearchBar planets={planets} onSearch={onSearch} />);
    
    const input = getByPlaceholderText('Search for planets...');
    fireEvent.change(input, { target: { value: 'earth' } });
    
    expect(input.value).toBe('earth');
    expect(onSearch).toHaveBeenCalledWith([planets[0]], 'earth');
  });
});
