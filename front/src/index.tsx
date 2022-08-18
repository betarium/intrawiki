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
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/login"} element={<LoginPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/logout"} element={<LogoutPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/error/404"} element={<NotFoundPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/error"} element={<ErrorPage />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </PublicFrame>
      <RestrictFrame>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/login"} element={<LoginPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/logout"} element={<LogoutPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/edit"} element={<EditPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/config"} element={<ConfigPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/config/users"} element={<UserListPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/config/users/add"} element={<UserDetailPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/config/users/:id"} element={<UserDetailPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/error/404"} element={<NotFoundPage />} />
            <Route path={process.env.REACT_APP_MANAGE_PATH + "/error"} element={<ErrorPage />} />
            <Route path='*' element={<ViewPage />} />
          </Routes>
        </BrowserRouter>
      </RestrictFrame>
    </TopFrame>
  </React.StrictMode>
);
