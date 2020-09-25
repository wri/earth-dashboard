import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import Parser from 'rss-parser';

// components
import Spinner from 'components/ui/spinner';
import MongabayNews from './mongabay-news';
import GuardianNews from './guardian-news';

// constants
import { 
    CORS_PROXY,
    MONGABAY_NEWS_TYPE,
    GUARDIAN_NEWS_TYPE 
} from './constants';

// styles
import styles from './news-widget.module.scss';

function NewsWidget(props) {
    const { widget } = props;
    const widgetConfig = widget && widget.widgetConfig;
    const newsWidgetConfig = widgetConfig && widgetConfig.newsWidgetConfig;
    const { url, type } = newsWidgetConfig || {};
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);

    const isMongabay = type === MONGABAY_NEWS_TYPE;
    const isGuardian = type === GUARDIAN_NEWS_TYPE;

    useEffect(() => {
        setLoading(true);
        const urlWithProxy = `${CORS_PROXY}${url}`;
                
        if (isMongabay) {
            const parser = new Parser();
            parser.parseURL(urlWithProxy)
                .then((response) => {
                    setLoading(false);
                    setItem(response.items[0]);
                })
                .catch((error) => {
                    toastr.error(`There was an error loading the news widget ${widget.id}: ${error}`);
                    setLoading(false);
                });
        } else if (isGuardian) {
            fetch(url)
                .then(response => response.json())
                .then((response) => {
                    setLoading(false);
                    setItem(response.response.content);
                })
                .catch((error) => {
                    toastr.error(`There was an error loading the news widget ${widget.id}: ${error}`);
                    setLoading(false);
                });
        }
        
        
      }, [widget]);

    
    
    return (
        <div className={styles['c-news-widget']}>
            <Spinner isLoading={loading} className="-relative -light" />
            {item && type === MONGABAY_NEWS_TYPE &&
                <MongabayNews item={item} />
            }
            {item && type === GUARDIAN_NEWS_TYPE &&
                <GuardianNews item={item} />
            }
        </div>
    );
}

NewsWidget.propTypes = {
    widget: PropTypes.object.isRequired
};

export default NewsWidget;
