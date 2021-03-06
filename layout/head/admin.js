import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

export default class HeadAdmin extends React.Component {
  render() {
    const { title, description } = this.props;

    return (
      <HeadNext>
        <title>{title} | RW Content Manager</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vizzuality" />
        <link rel="icon" href="/static/cropped-favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/static/cropped-favicon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/static/cropped-favicon-180x180.png" />
        <meta name="msapplication-TileImage" content="/static/cropped-favicon-270x270.png" />
        {/* TO-DO: remove this when Axios is completely implemented */}
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />

        {/* Mobile address background */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#A5177E" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#A5177E" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* leaflet styles */}
        {/* Leaflet styles are here to allow our chunk css (custom styles) override them */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.2/leaflet.draw.css"
          crossOrigin=""
        />
      </HeadNext>
    );
  }
}

HeadAdmin.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
