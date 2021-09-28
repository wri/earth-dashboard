import { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import HeadNext from "next/head";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

// constants
import { CESIUM_ROUTES } from "constants/app";

// utils
import { mediaStyle } from "utils/responsive";

const CesiumScript = dynamic(() => import("scripts/cesium"));

function HeadApp({ title, description, thumbnail, hostname, explicitHostname, themeColor }) {
  const { asPath } = useRouter();

  const isCesiumRoute = useMemo(() => CESIUM_ROUTES.includes(asPath), [asPath]);

  return (
    <Fragment>
      <HeadNext>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="title" content={title} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={explicitHostname ? explicitHostname : hostname} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:image:url" content={thumbnail} />
        <meta property="og:image:secure_url" content={thumbnail} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="Earth Dashboard" />

        {/* Facebook */}
        <meta property="fb:app_id" content="717221095898870" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={thumbnail} />

        {/* Theme color */}
        {/* Chrome, Firefox OS and Opera */}
        {!!themeColor && <meta name="theme-color" content={themeColor} />}
        {/* Windows Phone */}
        {!!themeColor && <meta name="msapplication-navbutton-color" content={themeColor} />}

        {/* leaflet styles */}
        {/* Leaflet styles are here to allow our chunk css (custom styles) override them */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.2/leaflet.draw.css"
          crossOrigin=""
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;1,400&family=Barlow:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Artsy - fresnel: for SSR*/}
        <style type="text/css">${mediaStyle}</style>
      </HeadNext>
      {isCesiumRoute && <CesiumScript />}
    </Fragment>
  );
}

HeadApp.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  routes: PropTypes.object.isRequired,
  hostname: PropTypes.string.isRequired,
  explicitHostname: PropTypes.string,
  themeColor: PropTypes.string
};

HeadApp.defaultProps = {
  title: null,
  description: null,
  thumbnail: null,
  explicitHostname: null,
  themeColor: null
};

export default HeadApp;
