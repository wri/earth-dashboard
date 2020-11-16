// constants
import {
    FORESTS_HEADLINE_SECTION_DATA,
    FORESTS_CHALLENGE_SECTION_DATA,
    FORESTS_DIVE_INTO_THE_DATA_DATA
} from 'layout/app/topic/data/forests/constants';
import {
    FRESHWATER_HEADLINE_SECTION_DATA,
    FRESHWATER_CHALLENGE_SECTION_DATA,
    FRESHWATER_DIVE_INTO_THE_DATA_DATA
} from 'layout/app/topic/data/freshwater/constants';
import {
    OCEANS_HEADLINE_SECTION_DATA,
    OCEANS_CHALLENGE_SECTION_DATA,
    OCEANS_DIVE_INTO_THE_DATA_DATA
} from 'layout/app/topic/data/oceans/constants';
import { 
    CLIMATE_CHALLENGE_SECTION_DATA,
    CLIMATE_HEADLINE_SECTION_DATA,
    CLIMATE_DIVE_INTO_THE_DATA_DATA
} from '../layout/app/topic/data/climate/constants';

// -------- TOPICS ----------
export const CLIMATE = 'climate';
export const FRESHWATER = 'freshwater';
export const OCEANS = 'oceans';
export const FORESTS = 'forests';

// ------- TOPIC COLORS -------
export const CLIMATE_COLOR = '#F35600';
export const CLIMATE_SECONDARY_COLOR = '#D85D44';

export const FRESHWATER_COLOR = '#1F88FF';
export const FRESHWATER_SECONDARY_COLOR = '#11466E';

export const OCEANS_COLOR = '#31A9BF';
export const OCEANS_SECONDARY_COLOR = '#31A9BF';

export const FORESTS_COLOR = '#009A67';
export const FORESTS_SECONDARY_COLOR = '#004D33';

export const MONGABAY_CLIMATE = 'climate';
export const MONGABAY_FRESHWATER = 'water';
export const MONGABAY_OCEANS = 'oceans';
export const MONGABAY_FORESTS = 'forests';

export function getColorByTopic(topicSt) {
    switch (topicSt) {
        case CLIMATE:
            return CLIMATE_COLOR;
        case FRESHWATER:
            return FRESHWATER_COLOR;
        case OCEANS:
            return OCEANS_COLOR;
        case FORESTS:
            return FORESTS_COLOR;
    }
}

const SHARE_ICONS_COMMON_PATH = '/static/images/share';

export function getEmailIconPerTopic(topicSt) {
    return `${SHARE_ICONS_COMMON_PATH}/email_${topicSt}.svg`;
}
export function getFacebookIconPerTopic(topicSt) {
    return `${SHARE_ICONS_COMMON_PATH}/facebook_${topicSt}.svg`;
}
export function getTwitterIconPerTopic(topicSt) {
    return `${SHARE_ICONS_COMMON_PATH}/twitter_${topicSt}.svg`;
}

export function getSecondaryColorByTopic(topicSt) {
    switch (topicSt) {
        case CLIMATE:
            return CLIMATE_SECONDARY_COLOR;
        case FRESHWATER:
            return FRESHWATER_SECONDARY_COLOR;
        case OCEANS:
            return OCEANS_SECONDARY_COLOR;
        case FORESTS:
            return FORESTS_SECONDARY_COLOR;
    }
}

export function getMongabayTagsByTopic(topicSt) {
    switch (topicSt) {
        case CLIMATE:
            return MONGABAY_CLIMATE;
        case FRESHWATER:
            return MONGABAY_FRESHWATER;
        case OCEANS:
            return MONGABAY_OCEANS;
        case FORESTS:
            return MONGABAY_FORESTS;
    }
}

export function getHeadlineSectionDataBytopic(topic) {
    switch (topic) {
        case CLIMATE:
            return CLIMATE_HEADLINE_SECTION_DATA;
        case FORESTS:
            return FORESTS_HEADLINE_SECTION_DATA;
        case FRESHWATER:
            return FRESHWATER_HEADLINE_SECTION_DATA;
        case OCEANS:
            return OCEANS_HEADLINE_SECTION_DATA;
        default:
            return null;
    }
};

export function getChallengeSectionDataByTopic(topic) {
    switch (topic) {
        case FORESTS:
            return FORESTS_CHALLENGE_SECTION_DATA;
        case FRESHWATER:
            return FRESHWATER_CHALLENGE_SECTION_DATA;
        case CLIMATE:
            return CLIMATE_CHALLENGE_SECTION_DATA;
        case OCEANS:
            return OCEANS_CHALLENGE_SECTION_DATA;
        default:
            return null;
    }
};

export function getDiveIntoTheDataDataByTopic(topic) {
    switch (topic) {
        case FORESTS:
            return FORESTS_DIVE_INTO_THE_DATA_DATA;
        case FRESHWATER:
            return FRESHWATER_DIVE_INTO_THE_DATA_DATA;
        case CLIMATE:
            return CLIMATE_DIVE_INTO_THE_DATA_DATA;
        case OCEANS:
            return OCEANS_DIVE_INTO_THE_DATA_DATA;
        default:
            return null;
    }
}
