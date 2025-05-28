import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.jsx';

import { CategoryProvider } from './providers/CategoryProvider.jsx';
import { ItemProvider } from './providers/ItemProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </CategoryProvider>
  </StrictMode>,
);
