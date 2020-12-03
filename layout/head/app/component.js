import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

// utils
import { mediaStyle } from 'utils/responsive';

class HeadApp extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    routes: PropTypes.object.isRequired,
    hostname: PropTypes.string.isRequired,
    explicitHostname: PropTypes.string,
    themeColor: PropTypes.string
  };

  static defaultProps = {
    title: null,
    description: null,
    thumbnail: null,
    explicitHostname: null,
    themeColor: null
  }

  render() {
    const {
      title,
      description,
      thumbnail,
      hostname,
      explicitHostname,
      themeColor
    } = this.props;
    return (
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
        <meta property="og:image:secure_url" content={thumbnail} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="Earth Dashboard"/>

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
          crossorigin=""
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.2/leaflet.draw.css"
          crossOrigin=""
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;1,400&family=Barlow:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet"/>
        
        { /* Artsy - fresnel: for SSR*/}
        <style type="text/css">${mediaStyle}</style>
      </HeadNext>
    );
  }
}

export default HeadApp;
