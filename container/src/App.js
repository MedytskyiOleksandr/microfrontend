import React, {lazy, Suspense} from "react";
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
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header/>
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path="/auth" component={AuthApp}/>
              <Route path="/" component={MarketingApp}/>
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
};
