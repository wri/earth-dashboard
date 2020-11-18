import { 
    CLIMATE_COLOR,
    FRESHWATER_COLOR,
    OCEANS_COLOR,
    FORESTS_COLOR
} from 'utils/topics';

export const SITE_NAVIGATION_HEADER_TAB = 'site-navigation';
export const ABOUT_HEADER_TAB = 'about';
export const SHARE_HEADER_TAB = 'share';

export const HEADER_TOPICS_DATA = [
    {
        label: 'CLIMATE',
        link: '/climate',
        color: CLIMATE_COLOR,
        links: [
            {
                label: 'The Global Commons Report',
                link: '/climate',
                highlight: false
            },
            {
                label: 'Charting the Threat Multiplier Effect of Climate Change',
                link: '/climate/data#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '/climate/data#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '/climate/data#dive-into-the-data',
                highlight: false
            }
        ]
    },
    {
        label: 'FORESTS',
        link: '/forests',
        color: FORESTS_COLOR,
        links: [
            {
                label: 'The Global Commons Report',
                link: '/forests',
                highlight: false
            },
            {
                label: 'From Carbon Sink to Carbon Source? Why the Amazon’s Future Hangs in the Balance',
                link: '/forests/data#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '/forests/data#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '/forests/data#dive-into-the-data',
                highlight: false
            }
        ]
    },
    {
        label: 'FRESHWATER',
        link: '/freshwater',
        color: FRESHWATER_COLOR,
        links: [
            {
                label: 'The Global Commons Report',
                link: '/freshwater',
                highlight: false
            },
            {
                label: 'Water Budgets: a Drop-by-Drop Guide',
                link: '/freshwater/data#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '/freshwater/data#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '/freshwater/data#dive-into-the-data',
                highlight: false
            }
        ]
    },
    {
        label: 'OCEANS',
        link: '/oceans',
        color: OCEANS_COLOR,
        mainLink: '/oceans/data',
        links: [
            {
                label: 'The Global Commons Report',
                link: '/oceans',
                highlight: false
            },
            {
                label: 'Towards a Sustainable Ocean Economy',
                link: '/oceans/data#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '/oceans/data#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '/oceans/data#dive-into-the-data',
                highlight: false
            }
        ]
    }
];