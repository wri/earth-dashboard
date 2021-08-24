import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { APOLLO_CLIENT } from "utils/news";

// store
import { wrapper } from "store";

// global styles
import "css/index.scss";

// actions
import { setRouter } from "slices/routes";
import { setUser } from "slices/user";
import { setHostname } from "slices/common";
import { useRouter } from "next/router";

function EDApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scroll({
        top: 0,
        left: 0
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
  }, []);

  return (
    <ApolloProvider client={APOLLO_CLIENT}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

EDApp.getInitialProps = async appContext => {
  const { router, ctx, Component } = appContext;
  const { store, req, query } = ctx;
  const { asPath } = router;
  const isServer = typeof window === "undefined";
  const pathname = req ? asPath : appContext.asPath;

  const url = { asPath, pathname, query };
  const hostname = isServer ? req.headers.host : window.origin;
  let user;

  if (store) {
    // set app routes
    store.dispatch(setRouter(url));
    // set hostname
    store.dispatch(setHostname(hostname));

    const { user } = isServer ? req : store.getState();

    if (user && Object.keys(user).length > 0) {
      store.dispatch(setUser(user));
    }
  }

  const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps: { ...appProps, user, isServer, url } };
};

export default wrapper.withRedux(EDApp);
