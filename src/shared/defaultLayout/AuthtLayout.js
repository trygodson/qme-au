import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoutes } from '../../EntryFile/authRoutes';
import { Navbar } from '../components/header/Navbar';

export const AuthLayout = ({ chiildren, match }) => {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          {AuthRoutes.map((route, i) => {
            <Route key={i} component={route.component} path={route.path} {...route} />;
          })}
        </Switch>
      </Suspense>
    </>
  );
};
