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
import PasswordChangePage from 'pages/config/PasswordChangePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const managePath = process.env.REACT_APP_MANAGE_PATH ?? '/intrawiki-manage'

root.render(
  <React.StrictMode>
    <TopFrame>
      <PublicFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={managePath + "/login"} element={<LoginPage />} />
            <Route path={managePath + "/logout"} element={<LogoutPage />} />
            <Route path={managePath + "/error/404"} element={<NotFoundPage />} />
            <Route path={managePath + "/error"} element={<ErrorPage />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </PublicFrame>
      <RestrictFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={managePath + "/login"} element={<LoginPage />} />
            <Route path={managePath + "/logout"} element={<LogoutPage />} />
            <Route path={managePath + "/edit"} element={<EditPage />} />
            <Route path={managePath + "/config"} element={<ConfigPage />} />
            <Route path={managePath + "/config/password"} element={<PasswordChangePage />} />
            <Route path={managePath + "/config/users"} element={<UserListPage />} />
            <Route path={managePath + "/config/users/add"} element={<UserDetailPage />} />
            <Route path={managePath + "/config/users/:id"} element={<UserDetailPage />} />
            <Route path={managePath + "/error/404"} element={<NotFoundPage />} />
            <Route path={managePath + "/error"} element={<ErrorPage />} />
            <Route path={"/error/404"} element={<NotFoundPage />} />
            <Route path={"/error"} element={<ErrorPage />} />
            <Route path='*' element={<ViewPage />} />
          </Routes>
        </BrowserRouter>
      </RestrictFrame>
    </TopFrame>
  </React.StrictMode>
);
