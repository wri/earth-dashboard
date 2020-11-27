import classnames from 'classnames';

// components
import OceanCurrentBox from './ocean-current-box';
import IslandsOfPlastic from './islands-of-plastic';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './ocean-scrolly-telling.module.scss';

const getTrendsInMarineFishStock = () =>
    <MediaContextProvider>
        <Desktop>
            <div className={styles['chart-with-title']}>
                <div>
                    <h6 className="ocean">Trends in Marine Fish Stocks</h6>
                    <img src="/static/images/scrolly-telling/ocean/trends-in-marine-fish-stocks.svg" />
                </div>
            </div>
        </Desktop>
        <Mobile>
            <div className={classnames({
                [styles['chart-with-title']]: true,
                [styles['-mobile']]: true
            })}>
                <div>
                    <h6 className="ocean">Trends in Marine Fish Stocks</h6>
                    <img src="/static/images/scrolly-telling/ocean/trends-in-marine-fish-stocks.svg" />
                </div>
            </div>
        </Mobile>
    </MediaContextProvider>;

export const OCEAN_STEPS_INTRO = [
    {
        index: 0,
        textPanel: {
            text:
                <div>
                    <h6 className="subheader">Ocean Uses</h6>
                    <h6 className="ocean">Accelerating Uses of Ocean Resources</h6>
                    <p>
                        Humans are using the oceans and exploiting their resources in a variety of ways and at an
                        unprecedented pace. Human impacts have surged since 1970, along with the hope that the
                        ocean can deliver as an economic frontier, but accumulating pressures on fragile and finite
                        resources are creating mounting risks.
                    </p>
                </div>
        }
    }
];

export const OCEAN_STEPS = [
    {
        index: 0,
        textPanel: {
            text:
                <div>
                    <h6 className="subheader">Threats to the Ocean</h6>
                    <h6 className="ocean">Coral Bleaching and Acidification</h6>
                    <p>
                        <span className="bold">Tipping points are approaching for coral reefs</span> threatened by ocean acidification and warmer water
                         caused by climate change.  Rising temperatures bleach the coral killing the algae that keep
                         it alive. At the same time <span className="bold">the ocean’s chemistry is changing faster than at any time in the last
                          50 million years</span>. Excess carbon dioxide absorbed by ocean water is lowering its pH and locking
                         up the carbonate ions sea creatures need to extract to build shells and reefs.
                    </p>
                    <p className="text-card-source">
                        Photo by NMSAS on Wikimedia Commons (Public domain)
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/ocean/threats-to-the-ocean.jpg'
        },
        stickyContainerElement: <div className={styles['coral-map']}>
            <div className={styles['coral-map-background']} />
        </div>
    },
    {
        index: 1,
        textPanel: {
            text:
                <div>
                    <h6 className="subheader">Threats to the Ocean</h6>
                    <h6 className="ocean">Projected Coral Death</h6>
                    <p>
                        <span className="bold">About 70-90% of all existing coral reefs are expected to disappear in the next 20 years</span> due to
                        warming oceans, more acidic water and pollution.
                    </p>
                </div>
        },
        stickyContainerElement: <div className={styles['coral-map']}>
            <div className={styles['coral-map-background']} />
        </div>
    },
    {
        index: 2,
        textPanel: {
            text:
                <div>
                    <h6 className="subheader">Fisheries Under Pressure</h6>
                    <h6 className="ocean">Increase in Food Demand from the Ocean</h6>
                    <p>
                        Between 1970 and 2012, populations of fish and other marine vertebrates such as mammals, reptiles
                        and birds <a className="external-link -ocean" href="http://ocean.panda.org.s3.amazonaws.com/media/Living_Blue_Planet_Report_2015_08_31.pdf" target="_blank">fell by half</a> (Source: Living Blue Planet Report). <span className="bold">Overfishing is a key reason</span>.
                    </p>
                    <p>
                        In 1974, only one in ten UN-monitored fish stocks were harvested beyond sustainable levels. Today more
                         than one in three are. This means that they <a className="external-link -ocean" href="http://www.fao.org/state-of-fisheries-aquaculture/en/" target="_blank">cannot reproduce as fast as they are being killed</a>.
                    </p>
                    <p className="text-card-source">
                        Photo by Ed Dunens on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a>
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/ocean/fisheries-under-pressure.jpg'
        },
        stickyContainerElement: getTrendsInMarineFishStock()


    },
    {
        index: 3,
        textPanel: {
            text:
                <div>
                    <p>
                        <a className="external-link -ocean" href="https://news.mongabay.com/2019/10/commitments-worth-63-billion-pledged-for-ocean-protection/" target="_blank"><span className="bold">Illegal or unregulated fishing is rampant</span></a>, and traps up to 26 million tons of fish a year, or
                        up to a third of high-value fish taken.
                    </p>
                    <p>
                        Bycatch, the netting of unwanted sea life, kills billions of fish, along with seabirds, sea turtles,
                        dolphins, and sharks, driving some species to the brink of extinction.
                    </p>
                </div>
        },
        stickyContainerElement: getTrendsInMarineFishStock()
    },
    {
        index: 4,
        textPanel: {
            text:
                <div>
                    <p>
                        However, recent studies from 2020 have shown that, <a className="external-link -ocean" href="https://www.pnas.org/content/117/4/2218" target="_blank"><span className="bold">regulated properly, fisheries can rebound</span></a>.
                    </p>
                    <p>
                        With intensive management, fisheries have recovered, and fish are twice as abundant as they are where they are not managed.
                    </p>
                </div>
        },
        stickyContainerElement:
            <MediaContextProvider>
                <Desktop>
                    <div className={styles['chart-with-title']}>
                        <div>
                            <h6 className="ocean">Aquaculture and fisheries</h6>
                            <img src="/static/images/scrolly-telling/ocean/aquaculture-and-fisheries.svg" />
                        </div>
                    </div>
                </Desktop>
                <Mobile>
                    <div className={classnames({
                        [styles['chart-with-title']]: true,
                        [styles['-mobile']]: true
                    })}>
                        <div>
                            <h6 className="ocean">Aquaculture and fisheries</h6>
                            <img src="/static/images/scrolly-telling/ocean/aquaculture-and-fisheries.svg" />
                        </div>
                    </div>
                </Mobile>
            </MediaContextProvider>
    },
    {
        index: 5,
        textPanel: {
            text:
                <div>
                    <h6 className="subheader">Islands of plastic</h6>
                    <h6 className="ocean">Plastic Pollution</h6>
                    <p>
                        <a className="external-link -ocean" href="https://www.nature.com/articles/s41598-018-22939-w" target="_blank"><span className="bold">A garbage truck's worth of plastic enters the ocean every minute</span></a>. Carried out to sea by rivers, it 
                        floats throughout them, swirling with the currents into islands of plastic, some up to 
                        millions of kilometers in diameter.
                    </p>
                    <p>
                        The largest, <a className="external-link -ocean" href="https://www.nature.com/articles/s41598-018-22939-w" target="_blank"><span className="bold">the Pacific Garbage Patch is three times the size of France</span></a>.
                    </p>
                    <p className="text-card-source">
                        Photo by Muntaka Chasant on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/ocean/islands-of-plastic.jpg'
        },
        stickyContainerElement: <IslandsOfPlastic />
    },
    {
        index: 6,
        textPanel: {
            text:
                <p>
                    The <a className="external-link -ocean" href="https://www.nationalgeographic.org/encyclopedia/great-pacific-garbage-patch/" target="_blank"><span className="bold">Great Pacific Garbage Patch</span></a> is a collection of marine debris in the North Pacific Ocean. Also 
                    known as the Pacific trash vortex, the garbage patch is actually two distinct collections of
                     debris bounded by the massive North Pacific Subtropical Gyre.
                </p>
        },
        stickyContainerElement:
            <div className={classnames({
                [styles['plastic-world-map']]: true,
                [styles['-pacific']]: true
            })}>
                <img
                    className={styles['map-image']}
                    src="/static/images/scrolly-telling/ocean/world-map.svg"
                />
            </div>
    },
    {
        index: 7,
        textPanel: {
            text:
                <div>
                    <h6 className="subheader">Ocean Industries</h6>
                    <h6 className="ocean">Benefits of Sustainable Interventions</h6>
                    <p>
                        Governments, companies and citizens must act with urgency to protect our planet’s oceans.
                         Investing sustainably can preserve biodiversity critical ecosystems and build the ocean-based
                          industries needed to provide jobs, energy, and food for a growing population. 
                          Such investments would be enormously cost-effective: <span className="bold">on average, the benefits would be five times greater than the costs</span>. 
                    </p>
                    <p>
                        This chart provides a summary of benefit-cost ratios for <a className="external-link -ocean" href="https://oceanpanel.org/sites/default/files/2020-07/Ocean%20Panel_Economic%20Analysis_FINAL.pdf" target="_blank"><span className="bold">four action areas over a 30-year horizon</span></a>. 
                        The benefit-cost ratios would vary, ranging from 3-to-1 to more than 12-to-1. 
                    </p>
                    <p className="text-card-source">
                        Photo by Nicholas Doherty on Unsplash
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/ocean/ocean-industries.jpg'
        },
        stickyContainerElement:
            <div className={styles['chart-with-title']}>
                <div>
                    <h6 className="ocean">Benefit-cost ratios for sustainable ocean interventions</h6>
                    <img src="/static/images/scrolly-telling/ocean/benefit-cost-ratios-for-sustainable-ocean-interventions.svg" />
                </div>
            </div>
    }
];
