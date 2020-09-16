import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

function GuardianNews(props){
    const { item } = props;
    const { fields: { thumbnail, trailText }, webTitle, webUrl} = item;

    return (
        <div className="c-guardian-news">
            <div className="image-container">
                <img src={thumbnail} />
            </div>
            <div className="text-container">
                <h3>
                    <a href={webUrl} target="_blank">
                        {webTitle}
                    </a>
                </h3>
                <p>{trailText}</p>
            </div>
        </div>
    );
}

GuardianNews.propTypes = {
    item: PropTypes.object.isRequired
};

export default GuardianNews;