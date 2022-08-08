import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import NotFoundPage from './pages/NotFoundPage';
import ViewPage from './pages/ViewPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path='*' element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
