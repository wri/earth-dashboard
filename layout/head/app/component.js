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

        <meta property="og:url" content={explicitHostname ? explicitHostname : hostname} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:image" content={thumbnail} />
        <meta property="og:image:secure_url" content={thumbnail} />
        <meta name="og:image:alt" content={`${title}_widget`} />

        {/* Theme color */}
        {themeColor && <meta name="theme-color" content={themeColor} />}

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
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Barlow&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap" rel="stylesheet"/> 
        { /* Artsy - fresnel: for SSR*/}
        <style type="text/css">${mediaStyle}</style>
      </HeadNext>
    );
  }
}

export default HeadApp;
