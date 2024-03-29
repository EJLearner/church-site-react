import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
