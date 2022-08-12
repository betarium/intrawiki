import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import NotFoundPage from './pages/NotFoundPage';
import ViewPage from './pages/ViewPage';
import LogoutPage from './pages/LogoutPage';
import TopFrame from './views/TopFrame';
import PublicFrame from './views/PublicFrame';
import RestrictFrame from './views/RestrictFrame';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TopFrame>
      <PublicFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/error/404" element={<NotFoundPage />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </PublicFrame>
      <RestrictFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/error/404" element={<NotFoundPage />} />
            <Route path='*' element={<ViewPage />} />
          </Routes>
        </BrowserRouter>
      </RestrictFrame>
    </TopFrame>
  </React.StrictMode>
);
