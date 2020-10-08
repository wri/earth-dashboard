import App from 'next/app';
import React from 'react';
import { wrapper } from '../store';

// es6 shim for .finally() in promises
import finallyShim from 'promise.prototype.finally';

// global styles
import 'css/index.scss';

// actions
import { setRouter } from 'redactions/routes';
import { setUser } from 'redactions/user';
import { setHostname } from 'redactions/common';

finallyShim.shim();

function EDApp(props){
  const {
    Component,
    pageProps
  } = props;

  return (
    <Component {...pageProps} />
  );
}

EDApp.getInitialProps = async (appContext) => {
  const { req, store, query, router } = appContext;
  const { asPath } = router;
  const isServer = typeof window === 'undefined';
  const pathname = req ? asPath : appContext.asPath;

  console.log('store', store, 'query', query, 'isServer', isServer);

  // sets app routes
  const url = { asPath, pathname, query };
  store.dispatch(setRouter(url));

  // sets hostname
  const hostname = isServer ? req.headers.host : window.origin;
  store.dispatch(setHostname(hostname));
  // sets user data coming from a request (server) or the store (client)
  const { user } = isServer ? req : store.getState();
  if (user) {
    store.dispatch(setUser(user));
  }

  const appProps = await App.getInitialProps(ctx);

  return { pageProps: { ...appProps, user, isServer, url } };
};

export default wrapper.withRedux(EDApp);
