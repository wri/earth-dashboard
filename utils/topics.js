export const CLIMATE_COLOR = '#D85D44';
export const FRESHWATER_COLOR = '#1F88FF';
export const OCEANS_COLOR = '#C83384';
export const FORESTS_COLOR = '#009A67';

export const CLIMATE = 'climate';
export const FRESHWATER = 'freshwater';
export const OCEANS = 'oceans';
export const FORESTS = 'forests';

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

