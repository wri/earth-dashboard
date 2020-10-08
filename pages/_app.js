import React from 'react';
import store from '../store';
import { Provider } from 'react-redux'

// global styles
import 'css/index.scss';

// actions
import { setRouter } from 'redactions/routes';
import { setUser } from 'redactions/user';
import { setHostname } from 'redactions/common';

function EDApp({ Component, pageProps }){
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

EDApp.getInitialProps = async (appContext) => {
  const { router, ctx, Component } = appContext;
  const { store, req, query } = ctx;
  const { asPath } = router;
  const isServer = typeof window === 'undefined';
  const pathname = req ? asPath : appContext.asPath;

  // sets app routes
  const url = { asPath, pathname, query };
  console.log('url', url);
  if (store) {
    store.dispatch(setRouter(url));
  }

  // sets hostname
  const hostname = isServer ? req.headers.host : window.origin;
  if (store) {
    store.dispatch(setHostname(hostname));
  }
  // sets user data coming from a request (server) or the store (client)
  const { user } = isServer ? req : store.getState();
  if (user) {
    store.dispatch(setUser(user));
  }

  const appProps = Component.getInitialProps
  ? await Component.getInitialProps(ctx)
  : {};

  return { pageProps: { ...appProps, user, isServer, url } };
};

export default EDApp;
