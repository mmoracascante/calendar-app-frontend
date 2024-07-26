import React from 'react'
import ReactDOM from 'react-dom/client'

import './style.css'
import { CalendarApp } from './CalendarApp'


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
)
