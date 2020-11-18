// constants
import {
    CLIMATE,
    FORESTS,
    OCEANS,
    FRESHWATER
} from './topics';

export function getPageMetadataByTopic(topicSt, isDataPage = false) {
    switch (topicSt) {
        case CLIMATE:
            if (!isDataPage) {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/climate.png'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Climate',
                    description: 'Earth Dashbarod - Climate desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/climate.png'
                };
            }
        case FORESTS:
            if (!isDataPage) {
                return {
                    title: 'From Carbon Sink to Carbon Source? Why the Amazon’s Future Hangs in the Balance',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/forests.png'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Forests',
                    description: 'Earth Dashbarod - Forests desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/forests.png'
                };
            }
        case FRESHWATER:
            if (!isDataPage) {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/freshwater.png'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Freshwater',
                    description: 'Earth Dashbarod - Freshwater desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/freshwater.png'
                };
            }
        case OCEANS:
            if (!isDataPage) {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. These threats intensify with each half degree that temperatures climb.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/oceans.png'
                };
            } else {
                return {
                    title: 'Earth Dashboard - Oceans',
                    description: 'Earth Dashbarod - Oceans desc.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/master/public/static/images/share/thumbnails/oceans.png'
                };
            }
    }
};