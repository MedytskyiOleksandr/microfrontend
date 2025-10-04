import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory, createMemoryHistory} from 'history';
import App from './App';

const mount = (element, {onNavigate, defaultHistory, initialPathname, onSignIn}) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPathname],
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, element);

  return {
    onParentNavigate: ({pathname: nextPathname}) => {
      const {pathname} = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, {defaultHistory: createBrowserHistory()});
  }
}

export {mount};
