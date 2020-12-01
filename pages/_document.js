import React from 'react';
import Document, { Html, Main, NextScript, Head } from 'next/document';

// utils
import { GA_TRACKING_ID } from "utils/gtag";

class MyDocument extends Document {
  render() {
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

          {/* IMPORTANT!!! THIS IS ONLY TEMPORARY IT NEEDS TO BE REMOVED BEFORE LAUNCH!! */}
          <meta name="robots" content="noindex" />

          {/* iOS Safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

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
          {process.env.ED_NODE_ENV === 'production' &&
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
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
                }}
              />
            </>
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
