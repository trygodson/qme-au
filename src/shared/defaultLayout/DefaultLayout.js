import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../EntryFile/Route';
import { Navbar } from '../components/header/Navbar';
import { useLocation } from 'react-router-dom';
import { AuthLayout } from './AuthtLayout';
import { Footer } from '../components/footer';

const Loading = () => {
  return (
    <main className="section vh-100">
      <section className="container">
        <div className="row align-items-center justify-content-center vh-100">
          <div className="column is-fullwidth is-offset-1">
            <div className="text-center">
              <>
                <h2 className="is-size-4">Loading. . .</h2>
              </>
              {/* {props.children ? (
                props.children
              ) : (
              )} */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const DefaultLayout = ({ chiildren }) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  return (
    <>
      {splitLocation[2] === 'login' || splitLocation[2] === 'register' ? (
        <AuthLayout />
      ) : (
        <>
          {splitLocation[1] === 'login' ||
          splitLocation[1] === 'register' ||
          splitLocation[1] === 'verify-otp' ? null : (
            <Navbar />
          )}
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route, i) => {
                return route.guarded ? (
                  <RouteGuard key={i} />
                ) : (
                  <Route key={i} component={route.component} path={route.path} {...route} />
                );
              })}
            </Switch>
          </Suspense>
        </>
      )}
      {splitLocation[1] === 'login' || splitLocation[1] === 'register' ? null : <Footer />}
    </>
  );
};
