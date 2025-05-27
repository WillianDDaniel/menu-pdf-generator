import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.jsx';

import { CategoryProvider } from './providers/CategoryProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </StrictMode>,
);
