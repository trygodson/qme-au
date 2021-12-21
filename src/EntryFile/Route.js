import { lazy } from 'react';
// import LandingPage from '../pages/LandingPage/landingPage';

const LandingPage = lazy(() => import('../pages/LandingPage/landingPage'));
const LoginPage = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const DoctorsListings = lazy(() => import('../pages/Mainpage/DoctorsListings'));
const DoctorsDetails = lazy(() => import('../pages/Mainpage/DoctorDetails'));
const Otp = lazy(() => import('../pages/Auth/VerifyOtp'));
const About = lazy(() => import('../pages/Mainpage/About'));

export const routes = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
    guarded: false,
  },
  {
    path: '/doctors',
    component: DoctorsListings,
    exact: true,
    guarded: false,
  },
  {
    path: '/doctors/:specializationId',
    component: DoctorsListings,
    guarded: false,
    exact: true,
  },
  {
    path: '/login',
    component: LoginPage,
    guarded: false,
  },
  {
    path: '/register',
    component: Register,
    guarded: false,
  },
  {
    path: '/verify-otp',
    component: Otp,
    guarded: false,
  },
  {
    path: '/doctor-details',
    component: DoctorsDetails,
    guarded: false,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    guarded: false,
  },
];
