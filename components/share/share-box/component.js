import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// utils
import {
    getEmailIconPerTopic,
    getTwitterIconPerTopic,
    getFacebookIconPerTopic,
    CLIMATE,
    FORESTS,
    FRESHWATER,
    OCEAN
} from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './share-box.module.scss';

function ShareBox({ url, topic, style, showInput, showBorder }) {
    const getContent = (mobile = false, urlValue) =>
        <div 
            className={classnames({
                [styles['main-container']]: true,
                [styles['-with-border']]: showBorder
            })}
            style={style}
        >
            {showInput &&
                <div className={classnames({
                    [styles['url-container']]: true,
                    [styles['-mobile']]: mobile,
                    [styles['-desktop']]: !mobile
                })}>
                    <input
                        type="text"
                        value={url}
                        disabled
                    />
                </div>
            }
            <div className={classnames({
                [styles['share-buttons']]: true,
                [styles['-mobile']]: mobile,
                [styles['-desktop']]: !mobile
            })}>
                <a href={`mailto:?subject=Earth Dashboard&body=I thought you'd be interested in what I found on the Earth Dashboard: ${urlValue}`}>
                    <div className={classnames({
                        [styles['share-button']]: true,
                        [styles['-mobile']]: mobile,
                        [styles['-desktop']]: !mobile,
                        [styles['-extra-margin']]: !showBorder
                    })}>
                        <img src={getEmailIconPerTopic(topic)} />
                    </div>
                </a>
                <a href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlValue)}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={classnames({
                        [styles['share-button']]: true,
                        [styles['-mobile']]: mobile,
                        [styles['-desktop']]: !mobile,
                        [styles['-extra-margin']]: !showBorder
                    })}>
                        <img src={getFacebookIconPerTopic(topic)} />
                    </div>
                </a>
                <a href={`https://twitter.com/share?url=${encodeURIComponent(urlValue)}&text=Check out what I found on the Earth Dashboard:`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={classnames({
                        [styles['share-button']]: true,
                        [styles['-mobile']]: mobile,
                        [styles['-desktop']]: !mobile,
                        [styles['-extra-margin']]: !showBorder
                    })}>
                        <img src={getTwitterIconPerTopic(topic)} />
                    </div>
                </a>
            </div>
            {showInput &&
                <CopyToClipboard text={urlValue}>
                    <button
                        className={classnames({
                            '-forests': topic === FORESTS,
                            '-ocean': topic === OCEAN,
                            '-climate': topic === CLIMATE,
                            '-freshwater': topic === FRESHWATER,
                            [styles['copy-link-button']]: true
                        })}
                    >
                        Copy link
                    </button>
                </CopyToClipboard>
            }
        </div>;

    return (
        <div className={styles['c-share-box']}>
            <MediaContextProvider>
                <Desktop>
                    {getContent(false, url)}
                </Desktop>
                <Mobile>
                    {getContent(true, url)}
                </Mobile>
            </MediaContextProvider>

        </div>
    );
}

ShareBox.propTypes = {
    url: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    style: PropTypes.object,
    showInput: PropTypes.bool,
    showBorder: PropTypes.bool
};

ShareBox.defaultProps = {
    showInput: true,
    showBorder: true
}

export default ShareBox;