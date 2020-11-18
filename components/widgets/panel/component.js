import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactCardFlip from 'react-card-flip';
import ShareModal from 'components/share/share-modal';

// components
import WidgetPreview from 'components/widgets/preview';

// styles
import styles from './widget-panel.module.scss';

function WidgetPanel({ widget, topic }) {
    const [flipCardOpen, setFlipCardOpen] = useState(false);
    const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
    const description = widget?.description;
    const metadata = widget?.metadata && widget.metadata[0];
    const caption = metadata?.info?.caption;
    const widgetLinks = metadata?.info?.widgetLinks;
    const isMap = widget?.widgetConfig?.paramsConfig?.visualizationType === 'map';
    const isServer = typeof window === 'undefined';

    const urlWithoutHash = !isServer && window.location.href.split('#')[0];
    const shareModalURL = !isServer && `${urlWithoutHash}#${widget?.id}`;
    const commontRWEmbedURL = 'https://resourcewatch.org/embed';
    const shareEmbedURL = `${commontRWEmbedURL}/${isMap ? 'map' : 'widget'}/${widget?.id}`;
    const embedTag = `<iframe src="${shareEmbedURL}" width="100%" height="500px" frameBorder="0" />`;

    return (
        <div
            className={styles['c-widget-panel']}
            id={widget?.id}
        >
            <div className={styles['panel-title']}>
                <span className={styles.title}>
                    {widget?.name}
                </span>
                <div className={styles['panel-actions']}>
                    <button
                        className={styles['share-button']}
                        onClick={() => setShareModalIsOpen(true)}
                    />
                    {!flipCardOpen &&
                        <button
                            className={styles['info-button']}
                            onClick={() => setFlipCardOpen(true)}
                        />
                    }
                    {flipCardOpen &&
                        <button
                            className={styles['close-button']}
                            onClick={() => setFlipCardOpen(false)}
                        />
                    }
                </div>
            </div>
            <ReactCardFlip
                isFlipped={flipCardOpen}
                flipDirection="horizontal"
                containerStyle={{
                    display: 'flex',
                    width: '100%',
                    height: '100%'
                }}
            >
                <div
                    className={classnames({
                        [styles['widget-preview-container']]: true,
                        [styles['-chart']]: !isMap
                    })}
                >
                    {widget && <WidgetPreview widget={widget} />}
                </div>
                <div className={styles['info-container']}>
                    {description &&
                        <div>
                            <h5>Description</h5>
                            <p>{description}</p>
                        </div>
                    }
                    {widgetLinks &&
                        <div>
                            <h5>Links</h5>
                            <ul>
                                {widgetLinks.map(link =>
                                    <li>
                                        <a href={link.link} target="_blank">
                                            {link.name}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                    {caption &&
                        <div className={styles.caption}>
                            {caption}
                        </div>
                    }
                </div>
            </ReactCardFlip>
            <ShareModal
                topic={topic}
                url={shareModalURL}
                embedTag={embedTag}
                onClose={() => setShareModalIsOpen(false)}
                isOpen={shareModalIsOpen}
            />
            <div className={styles['powered-by']}>
                powered by <a href="https://resourcewatch.org/" target="_blank">RESOURCEWATCH</a>
            </div>
        </div>
    );
}

WidgetPanel.propTypes = { widget: PropTypes.object.isRequired };

export default WidgetPanel;

