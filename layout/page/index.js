import { setUser } from 'redactions/user';
import { setRouter } from 'redactions/routes';
import { setHostname } from 'redactions/common';

function Page() { }

Page.getInitialProps = async (appContext) => {
  const { router, ctx } = appContext;
  const { store, req, query } = ctx;
  const { asPath } = router;
  const isServer = typeof window === 'undefined';
  const pathname = req ? asPath : appContext.asPath;

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

  console.log('hey!!!');

  return { user, isServer, url };
};


export default Page;
