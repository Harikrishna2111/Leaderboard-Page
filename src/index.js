// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the modern root API
import './index.css'; // You may need to create a base CSS file
import App from './App';

// Get the root element from public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);