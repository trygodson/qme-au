import { lazy } from 'react';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
// import LandingPage from '../pages/LandingPage/landingPage';

export const AuthRoutes = [
  {
    path: 'login',
    component: Login,
    guarded: false,
  },
  {
    path: 'register',
    component: Register,
    guarded: false,
  },
];
