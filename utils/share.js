// constants
import {
    CLIMATE,
    FORESTS,
    OCEAN,
    FRESHWATER,
    BIODIVERSITY
} from './topics';

export function getPageMetadataByTopic(topicSt, isDataPage = false) {
    switch (topicSt) {
        case CLIMATE:
            if (!isDataPage) {
                return {
                    title: 'Climate: The Global Commons Report',
                    description: 'The latest datasets, statistics and news stories about the state of the climate from trusted sources.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/climate.jpg'
                };
            } else {
                return {
                    title: 'Charting the Threat Multiplier Effect of Climate Change',
                    description: 'Rising global temperatures pose a threat to every corner of the globe and most aspects of human life.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/climate.jpg'
                };
            }
        case FORESTS:
            if (!isDataPage) {
                return {
                    title: 'Forests: The Global Commons Report',
                    description: 'The latest datasets, statistics and news stories about the state of forests from trusted sources.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/forests.jpg'
                };
            } else {
                return {
                    title: 'The Amazon’s Future Hangs in the Balance',
                    description: 'Tree cover loss, especially in irreplaceable primary forests rich in species and carbon, is a planetary emergency.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/forests.jpg'
                };
            }
        case FRESHWATER:
            if (!isDataPage) {
                return {
                    title: 'Freshwater: The Global Commons Report',
                    description: 'The latest datasets, statistics and news stories about the state of freshwater from trusted sources.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/freshwater.jpg'
                };
            } else {
                return {
                    title: 'Water Budgets: A Drop-by-Drop Guide',
                    description: 'Scroll down to understand how a water budget works, and how it affects human wellbeing when a region overspends.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/freshwater.jpg'
                };
            }
        case OCEAN:
            if (!isDataPage) {
                return {
                    title: 'Ocean: The Global Commons Report',
                    description: 'The latest datasets, statistics and news stories about the state of the ocean from trusted sources.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/ocean.jpg'
                };
            } else {
                return {
                    title: 'Towards a Sustainable Ocean Economy',
                    description: 'A healthy ocean is critical to a sustainable global economy and stable climate.',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/ocean.jpg'
                };
            }
        case BIODIVERSITY:
            if (!isDataPage) {
                return {
                    title: 'Biodiversity: The Global Commons Report',
                    description: '-',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/ocean.jpg'
                };
            } else {
                return {
                    title: 'Biodiversity title',
                    description: '-',
                    thumbnail: 'https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/ocean.jpg'
                };
            }
    }
};