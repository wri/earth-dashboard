/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Main, NextScript, Head } from "next/document";

// utils
import { DEBUG as GA_DEBUG, GA_TRACKING_ID } from "utils/gtag";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      includeGA: !ctx.asPath.startsWith("/admin") && !ctx.asPath.startsWith("/sign-in")
    };
  }

  render() {
    const { includeGA } = this.props;

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="author" content="Vizzuality" />
          <link rel="icon" href="/static/cropped-favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/static/cropped-favicon-192x192.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/static/cropped-favicon-180x180.png" />
          <meta name="msapplication-TileImage" content="/static/cropped-favicon-270x270.png" />
          <link
            rel="stylesheet"
            media="screen"
            href="https://fonts.googleapis.com/css?family=Lato:400,300,700&display=swap"
          />
          <link rel="shortcut icon" href="/static/cropped-favicon-32x32.png"></link>

          {/* iOS Safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

          {/* NETCDFJS library to read NETCDF files */}
          <script src="https://www.lactame.com/lib/netcdfjs/0.7.0/netcdfjs.min.js"></script>

          {/* Leaflet CDN */}
          {/* leaflet script necessary for the Widget Editor */}
          <script
            src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossOrigin=""
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.2/leaflet.draw.js" crossOrigin="" />
          <script
            src="https://unpkg.com/esri-leaflet@2.1.3/dist/esri-leaflet.js"
            integrity="sha512-pijLQd2FbV/7+Jwa86Mk3ACxnasfIMzJRrIlVQsuPKPCfUBCDMDUoLiBQRg7dAQY6D1rkmCcR8286hVTn/wlIg=="
            crossOrigin=""
          />
          <script src="https://unpkg.com/leaflet-utfgrid/L.UTFGrid-min.js" crossOrigin="" />

          {/* Google API */}
          <script
            src={`https://maps.googleapis.com/maps/api/js?v=weekly&key=${process.env.RW_GOGGLE_API_TOKEN_SHORTENER}&libraries=places`}
          />

          {/* Polifyll */}
          {/* TO-DO: remove once axios is completely implemented */}
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />

          {/* Google Tag Manager */}
          {(GA_DEBUG || (process.env.ED_NODE_ENV === "production" && includeGA)) && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GA_TRACKING_ID}');`
              }}
            />
          )}

          {/* Twitter universal website tag code */}
          {process.env.ED_NODE_ENV === "production" && includeGA && (
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
              a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
              // Insert Twitter Pixel ID and Standard Event data below
              twq('init','o6zz1');
              twq('track','PageView');`
              }}
            />
          )}
          {/* End Twitter universal website tag code */}

          {/* ------ HOTJAR TRACKING CODE ------ */}
          {process.env.ED_NODE_ENV === "production" && includeGA && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2159027,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `
              }}
            />
          )}
          {/* ------ CRAZY EGG ------ */}
          {process.env.ED_NODE_ENV === "production" && includeGA && (
            <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0069/4623.js" async="async" />
          )}
        </Head>
        <body>
          {(GA_DEBUG || (process.env.ED_NODE_ENV === "production" && includeGA)) && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
              }}
            />
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
