import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import Parser from 'rss-parser';

// components
import Spinner from 'components/ui/Spinner';

// constants
import { CORS_PROXY } from './constants';

// styles
import './styles.scss';

function NewsWidget(props) {
    const { widget } = props;
    const widgetConfig = widget && widget.widgetConfig;
    const newsWidgetConfig = widgetConfig && widgetConfig.newsWidgetConfig;
    const { url, type } = newsWidgetConfig || {};
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        const parser = new Parser();
        parser.parseURL(`${CORS_PROXY}${url}`)
            .then((response) => {
                setLoading(false);
                const post = response.items[0];
                const { link, title, enclosure: { url: imageURL }, contentSnippet: description} = post;
                setData({
                    title,
                    link,
                    description,
                    imageURL
                });
            })
            .catch((error) => {
                toastr.error(`There was an error loading the news widget ${widget.id}: ${error}`);
                setLoading(false);
            });
        
      }, [widget]);

    
    
    return (
        <div className="c-news-widget">
            <Spinner isLoading={loading} className="-relative -light" />
            {data && 
                <div className="news-container">
                    <div className="image-container">
                        <img src={data.imageURL} />
                    </div>
                    <div className="text-container">
                        <h3>
                            <a href={data.link} target="_blank">
                                {data.title}
                            </a>
                        </h3>
                        <p>{data.description}</p>
                    </div>
                </div>
            }
        </div>
    );
}

NewsWidget.propTypes = {
    widget: PropTypes.object.isRequired
};

export default NewsWidget;
