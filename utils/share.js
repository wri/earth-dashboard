// constants
import {
    CLIMATE,
    FORESTS,
    OCEAN,
    FRESHWATER
} from './topics';

export function getPageMetadataByTopic(topicSt, isDataPage = false) {
    switch (topicSt) {
        case CLIMATE:
            if (!isDataPage) {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/climate.jpg'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Climate',
                    description: 'Earth Dashbarod - Climate desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/climate.jpg'
                };
            }
        case FORESTS:
            if (!isDataPage) {
                return {
                    title: 'From Carbon Sink to Carbon Source? Why the Amazon’s Future Hangs in the Balance',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/forests.jpg'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Forests',
                    description: 'Earth Dashbarod - Forests desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/forests.jpg'
                };
            }
        case FRESHWATER:
            if (!isDataPage) {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/freshwater.jpg'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Freshwater',
                    description: 'Earth Dashbarod - Freshwater desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/freshwater.jpg'
                };
            }
        case OCEAN:
            if (!isDataPage) {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/ocean.jpg'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Oceans',
                    description: 'Earth Dashbarod - Oceans desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/ocean.jpg'
                };
            }
    }
};