import React, {lazy, Suspense, useEffect, useState} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core";
import {createBrowserHistory} from 'history';

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthApp = lazy(() => import("./pages/AuthApp"));
const MarketingApp = lazy(() => import("./pages/MarketingApp"));
const DashboardApp = lazy(() => import('./pages/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container_app',
});

const history = createBrowserHistory();

export default () => {
  const [isAuth, setIsAuth] = useState(() => false);

  useEffect(() => {
    if (isAuth) {
      history.push('/dashboard');
    }

  }, [isAuth]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header signedIn={isAuth} onSignOut={() => setIsAuth(false)}/>
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsAuth(true)}/>
              </Route>
              <Route path="/dashboard">
                {!isAuth && <Redirect to="/"/>}
                <DashboardApp/>
              </Route>
              <Route path="/" component={MarketingApp}/>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  )
};
