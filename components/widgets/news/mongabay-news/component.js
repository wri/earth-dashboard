import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

function MongabayNews(props){
    const { item } = props;
    const { link, title, enclosure: { url: imageURL }, contentSnippet: description} = item;

    return (
        <div className="c-mongabay-news">
            <div className="image-container">
                <img src={imageURL} />
            </div>
            <div className="text-container">
                <h3>
                    <a href={link} target="_blank">
                        {title}
                    </a>
                </h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

MongabayNews.propTypes = {
    item: PropTypes.object.isRequired
};

export default MongabayNews;