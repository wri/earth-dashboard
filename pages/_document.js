import React from 'react';
import Document, { Html, Main, NextScript, Head } from 'next/document';

// utils
import { GA_TRACKING_ID } from "utils/gtag";

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      includeGA: !ctx.asPath.startsWith('/admin') && !ctx.asPath.startsWith('/sign-in')
    }
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
            href="https://fonts.googleapis.com/css?family=Lato:400,300,700"
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
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.2/leaflet.draw.js"
            crossOrigin=""
          />
          <script
            src="https://unpkg.com/esri-leaflet@2.1.3/dist/esri-leaflet.js"
            integrity="sha512-pijLQd2FbV/7+Jwa86Mk3ACxnasfIMzJRrIlVQsuPKPCfUBCDMDUoLiBQRg7dAQY6D1rkmCcR8286hVTn/wlIg=="
            crossOrigin=""
          />
          <script
            src="https://unpkg.com/leaflet-utfgrid/L.UTFGrid-min.js"
            crossOrigin=""
          />

          {/* Google API */}
          <script
            src={`https://maps.googleapis.com/maps/api/js?v=weekly&key=${process.env.RW_GOGGLE_API_TOKEN_SHORTENER
              }&libraries=places`}
          />

          {/* Polifyll */}
          {/* TO-DO: remove once axios is completely implemented */}
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />


          {/* GOOGLE ANALYTICS */}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {process.env.ED_NODE_ENV === 'production' && includeGA &&
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}',+ {
                page_path: window.location.pathname,
              });
          `
                }}
              />
            </>
          }
          {/* ------ HOTJAR TRACKING CODE ------ */}
          {process.env.ED_NODE_ENV === 'production' && includeGA &&
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
              }} />
          }
          {/* ------ CRAZY EGG ------ */}
          {process.env.ED_NODE_ENV === 'production' && includeGA &&
            <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0069/4623.js" async="async" />
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
