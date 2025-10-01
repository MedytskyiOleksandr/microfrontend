import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createGenerateClassName, StylesProvider} from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const generateClassName = createGenerateClassName({
  productionPrefix: 'marketing_app',
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing}/>
          <Route path="/" component={Landing}/>
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};
