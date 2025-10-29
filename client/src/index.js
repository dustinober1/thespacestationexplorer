import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { SoundProvider } from './utils/SoundManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SoundProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </SoundProvider>
  </React.StrictMode>
);
