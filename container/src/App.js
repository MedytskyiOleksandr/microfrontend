import React, {lazy, Suspense, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthApp = lazy(() => import("./pages/AuthApp"));
const MarketingApp = lazy(() => import("./pages/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container_app',
});

export default () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header signedIn={isAuth} onSignOut={() => setIsAuth(false)}/>
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsAuth(true)}/>
              </Route>
              <Route path="/" component={MarketingApp}/>
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
};
