import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DefaultLayout } from '../shared/defaultLayout/DefaultLayout';
import { routes } from './Route';

import RouteGuard from './RouteGuard';
// import '../assets/css/bootstrap.min.css';
// import '../assets/js/bootstrap.min.js';
// import '../assets/js/jquery-3.2.1.min.js';
// import '../assets/js/popper.min.js';

function App() {
  return <DefaultLayout />;
}

export default App;
