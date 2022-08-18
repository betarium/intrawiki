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
import UserListPage from 'pages/config/UserListPage';
import ConfigPage from 'pages/config/ConfigPage';
import ErrorPage from 'pages/ErrorPage';
import UserDetailPage from 'pages/config/UserDetailPage';

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
            <Route path="/intrawiki-manage/login" element={<LoginPage />} />
            <Route path="/intrawiki-manage/logout" element={<LogoutPage />} />
            <Route path="/intrawiki-manage/error/404" element={<NotFoundPage />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </PublicFrame>
      <RestrictFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/intrawiki-manage/login" element={<LoginPage />} />
            <Route path="/intrawiki-manage/logout" element={<LogoutPage />} />
            <Route path="/intrawiki-manage/edit" element={<EditPage />} />
            <Route path="/intrawiki-manage/config" element={<ConfigPage />} />
            <Route path="/intrawiki-manage/config/users" element={<UserListPage />} />
            <Route path="/intrawiki-manage/config/users/add" element={<UserDetailPage />} />
            <Route path="/intrawiki-manage/config/users/:id" element={<UserDetailPage />} />
            <Route path="/intrawiki-manage/error/404" element={<NotFoundPage />} />
            <Route path="/intrawiki-manage/error" element={<ErrorPage />} />
            <Route path='*' element={<ViewPage />} />
          </Routes>
        </BrowserRouter>
      </RestrictFrame>
    </TopFrame>
  </React.StrictMode>
);
