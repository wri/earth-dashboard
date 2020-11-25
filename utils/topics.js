// constants
import {
    FORESTS_HEADLINE_SECTION_DATA,
    FORESTS_CHALLENGE_SECTION_DATA,
    FORESTS_DIVE_INTO_THE_DATA_DATA,
    FORESTS_METHODOLOGY_DATA
} from 'layout/app/topic/data/forests/constants';
import {
    FRESHWATER_HEADLINE_SECTION_DATA,
    FRESHWATER_CHALLENGE_SECTION_DATA,
    FRESHWATER_DIVE_INTO_THE_DATA_DATA,
    FRESHWATER_METHODOLOGY_DATA
} from 'layout/app/topic/data/freshwater/constants';
import {
    OCEAN_HEADLINE_SECTION_DATA,
    OCEAN_CHALLENGE_SECTION_DATA,
    OCEAN_DIVE_INTO_THE_DATA_DATA,
    OCEAN_METHODOLOGY_DATA
} from 'layout/app/topic/data/ocean/constants';
import { func } from 'prop-types';
import { 
    CLIMATE_CHALLENGE_SECTION_DATA,
    CLIMATE_HEADLINE_SECTION_DATA,
    CLIMATE_DIVE_INTO_THE_DATA_DATA,
    CLIMATE_METHODOLOGY_DATA
} from '../layout/app/topic/data/climate/constants';

// -------- TOPICS ----------
export const CLIMATE = 'climate';
export const FRESHWATER = 'freshwater';
export const OCEAN = 'ocean';
export const FORESTS = 'forests';

// ------- TOPIC COLORS -------
export const CLIMATE_COLOR = '#F35600';
export const CLIMATE_DARK_COLOR = '#752900';
export const CLIMATE_SECONDARY_COLOR = '#D85D44';

export const FRESHWATER_COLOR = '#1F88FF';
export const FRESHWATER_DARK_COLOR = '#003E85';
export const FRESHWATER_SECONDARY_COLOR = '#11466E';

export const OCEAN_COLOR = '#31A9BF';
export const OCEAN_DARK_COLOR = '#174F59';
export const OCEAN_SECONDARY_COLOR = '#31A9BF';

export const FORESTS_COLOR = '#009A67';
export const FORESTS_DARK_COLOR = '#004D33';
export const FORESTS_SECONDARY_COLOR = '#004D33';

export const MONGABAY_CLIMATE = 'climate';
export const MONGABAY_FRESHWATER = 'water';
export const MONGABAY_OCEAN = 'ocean';
export const MONGABAY_FORESTS = 'forests';

export function getColorByTopic(topicSt, darkOption=false) {
    switch (topicSt) {
        case CLIMATE:
            return darkOption ? CLIMATE_COLOR : CLIMATE_COLOR;
        case FRESHWATER:
            return darkOption ? FRESHWATER_COLOR : FRESHWATER_COLOR;
        case OCEAN:
            return darkOption ? OCEAN_COLOR : OCEAN_COLOR;
        case FORESTS:
            return darkOption ? FORESTS_COLOR : FORESTS_COLOR;
    }
}

const SHARE_ICONS_COMMON_PATH = '/static/images/share';

export function getEmailIconPerTopic(topicSt) {
    if (topicSt) {
        return `${SHARE_ICONS_COMMON_PATH}/email_${topicSt}.svg`;
    } else {
        return `${SHARE_ICONS_COMMON_PATH}/email_white.svg`;
    }
}
export function getFacebookIconPerTopic(topicSt) {
    if (topicSt) {
        return `${SHARE_ICONS_COMMON_PATH}/facebook_${topicSt}.svg`;
    } else {
        return `${SHARE_ICONS_COMMON_PATH}/facebook_white.svg`;
    }
}
export function getTwitterIconPerTopic(topicSt) {
    if (topicSt) {
        return `${SHARE_ICONS_COMMON_PATH}/twitter_${topicSt}.svg`;
    } else {
        return `${SHARE_ICONS_COMMON_PATH}/twitter_white.svg`;
    }
}

export function getSecondaryColorByTopic(topicSt) {
    switch (topicSt) {
        case CLIMATE:
            return CLIMATE_SECONDARY_COLOR;
        case FRESHWATER:
            return FRESHWATER_SECONDARY_COLOR;
        case OCEAN:
            return OCEAN_SECONDARY_COLOR;
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
        case OCEAN:
            return MONGABAY_OCEAN;
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
        case OCEAN:
            return OCEAN_HEADLINE_SECTION_DATA;
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
        case OCEAN:
            return OCEAN_CHALLENGE_SECTION_DATA;
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
        case OCEAN:
            return OCEAN_DIVE_INTO_THE_DATA_DATA;
        default:
            return null;
    }
}

export function getMethodologyDataByTopic(topic) {
    switch (topic) {
        case FORESTS:
            return FORESTS_METHODOLOGY_DATA;
        case FRESHWATER:
            return FRESHWATER_METHODOLOGY_DATA;
        case CLIMATE:
            return CLIMATE_METHODOLOGY_DATA;
        case OCEAN:
            return OCEAN_METHODOLOGY_DATA;
        default:
            return null;
    }
}
