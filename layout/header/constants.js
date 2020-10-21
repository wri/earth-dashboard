import { 
    CLIMATE_COLOR,
    FRESHWATER_COLOR,
    OCEANS_COLOR,
    FORESTS_COLOR
} from 'utils/topics';

export const HEADER_TOPICS_DATA = [
    {
        label: 'CLIMATE',
        color: CLIMATE_COLOR,
        mainLink: '/climate/data',
        links: [
            {
                label: 'The Global Commons Report',
                link: '#',
                highlight: false
            },
            {
                label: 'Charting the Threat Multiplier Effect of Climate Change',
                link: '#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '#dive-into-the-data',
                highlight: false
            }
        ]
    },
    {
        label: 'FORESTS',
        color: FORESTS_COLOR,
        mainLink: '/forests/data',
        links: [
            {
                label: 'The Global Commons Report',
                link: '#',
                highlight: false
            },
            {
                label: 'From Carbon Sink to Carbon Source? Why the Amazon’s Future Hangs in the Balance',
                link: '#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '#dive-into-the-data',
                highlight: false
            }
        ]
    },
    {
        label: 'FRESHWATER',
        color: FRESHWATER_COLOR,
        mainLink: '/freshwater/data',
        links: [
            {
                label: 'The Global Commons Report',
                link: '#',
                highlight: false
            },
            {
                label: 'Water Budgets: a Drop-by-Drop Guide',
                link: '#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '#dive-into-the-data',
                highlight: false
            }
        ]
    },
    {
        label: 'OCEANS',
        color: OCEANS_COLOR,
        mainLink: '/oceans/data',
        links: [
            {
                label: 'The Global Commons Report',
                link: '#',
                highlight: false
            },
            {
                label: 'Towards a Sustainable Ocean Economy',
                link: '#scrolly-telling',
                highlight: true
            },
            {
                label: 'The Challenge to our Global Commons',
                link: '#challenge-to-our-global-commons',
                highlight: false
            },
            {
                label: 'Dive into the Data',
                link: '#dive-into-the-data',
                highlight: false
            }
        ]
    }
];