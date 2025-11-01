import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// A component that throws an error
const ProblemChild = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  it('should catch an error and display the fallback UI', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(getByText('⚠️ Something went wrong')).toBeInTheDocument();
  });
});
