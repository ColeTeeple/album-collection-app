import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlbumCollectionContextProvider } from './contexts/AlbumCollectionContext';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlbumCollectionContextProvider>
    <App />
    </AlbumCollectionContextProvider>
  </React.StrictMode>
);

