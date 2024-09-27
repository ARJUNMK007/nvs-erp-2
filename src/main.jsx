import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/poppins'; // Defaults to weight 400.
import '@fontsource/poppins/300.css'; // Light weight
import '@fontsource/poppins/400.css'; // Regular weight
import '@fontsource/poppins/500.css'; // Medium weight
import '@fontsource/poppins/700.css'; // Bold weight
import '@fontsource/poppins'; // Defaults to weight 400.




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
