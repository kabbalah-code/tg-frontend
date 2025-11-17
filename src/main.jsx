import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Initialize Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  
  // Configure the app
  tg.ready();
  tg.expand();
  
  // Set colors
  tg.setHeaderColor('#0a0a0a');
  tg.setBackgroundColor('#0a0a0a');
  
  // Enable closing confirmation
  tg.enableClosingConfirmation();
  
  // Disable vertical swipes
  tg.disableVerticalSwipes();
  
  console.log('Telegram WebApp initialized:', {
    version: tg.version,
    platform: tg.platform,
    colorScheme: tg.colorScheme,
    initData: tg.initData ? 'Present' : 'Missing'
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
