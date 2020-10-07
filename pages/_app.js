import App from 'next/app';
import React from 'react';
import { wrapper } from '../store';

// es6 shim for .finally() in promises
import finallyShim from 'promise.prototype.finally';

// actions
import { setUser } from 'redactions/user';

// global styles
import 'css/index.scss';

finallyShim.shim();

class EDApp extends App {
  // static async getInitialProps({ Component, router, ctx }) {
  //   const { asPath } = router;
  //   const { req, store, query, isServer } = ctx;
  //   const pathname = req ? asPath : ctx.asPath;

  //   // sets app routes
  //   const url = { asPath, pathname, query };
  //   store.dispatch(setRouter(url));

    
  //   console.log('ctx', ctx);
  //   console.log('isServer', isServer);

  //   // sets hostname
  //   const hostname = isServer ? req.headers.host : window.origin;
  //   store.dispatch(setHostname(hostname));
  //   // sets user data coming from a request (server) or the store (client)
  //   const { user } = isServer ? req : store.getState();
  //   if (user) {
  //     store.dispatch(setUser(user));
  //   }

  //   // mobile detection
  //   if (isServer) {
  //     const mobileDetect = mobileParser(req);
  //     store.dispatch(setMobileDetect(mobileDetect));
  //   }

  //   const pageProps = Component.getInitialProps
  //     ? await Component.getInitialProps(ctx)
  //     : {};

  //   return { pageProps: { ...pageProps, user, isServer, url } };
  // }

  render() {
    const {
      Component,
      pageProps
    } = this.props;

    return (
      <Component {...pageProps} />
    );
  }
}

export default wrapper.withRedux(EDApp);

export async function getServerSideProps(context) {
  const { req, store } = context;

  if (req.user) {
    store.dispatch(setUser(user));
  }
}
