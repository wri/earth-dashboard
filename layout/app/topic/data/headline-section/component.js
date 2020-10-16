import React from 'react';

// constants
import { CLIMATE_HEADLINE_SECTION_DATA } from '../climate/constants';
import { FORESTS_HEADLINE_SECTION_DATA } from '../forests/constants';
import { FRESHWATER_HEADLINE_SECTION_DATA } from '../freshwater/constants';
import { OCEANS_HEADLINE_SECTION_DATA } from '../oceans/constants';

// utils
import {
    CLIMATE,
    FRESHWATER,
    FORESTS,
    OCEANS,
    getColorByTopic,
    getSecondaryColorByTopic
} from 'utils/topics';

// styles
import styles from './headline-section.module.scss';

function HeadlineSection(props) {
    const { topic } = props;
    const topicColor = getColorByTopic(topic);
    const topicSecondaryColor = getSectionDataBytopic(topic);
    const sectionData = getSectionDataBytopic(topic);

    return (
        <div
            className={styles['c-headline-section']}
            style={{ backgroundColor: topicColor }}
        >
            <div className={styles['main-container']}>
                <div className={styles['topic-name-title']}>
                    {topic.toUpperCase()}
                </div>
                {sectionData.mainTitle}
                <div className={styles.subtitle}>
                    {sectionData.subtitle}
                </div>
                <div
                    className={styles['scroll-to-explore']}
                    style={{ backgroundColor: topicSecondaryColor }}
                >
                    SCROLL TO EXPLORE
                </div>
            </div>
        </div>
    );
}

function getSectionDataBytopic(topic) {
    switch (topic) {
        case CLIMATE:
            return CLIMATE_HEADLINE_SECTION_DATA; 
        case FORESTS:
            return FORESTS_HEADLINE_SECTION_DATA;
        case FRESHWATER:
            return FRESHWATER_HEADLINE_SECTION_DATA;
        case OCEANS:
            return OCEANS_HEADLINE_SECTION_DATA;
    };
}

export default HeadlineSection;