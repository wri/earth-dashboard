import classnames from 'classnames';

// components
import OceanCurrentBox from './ocean-current-box';

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
                        <strong>Tipping points are approaching for coral reefs</strong> threatened by ocean acidification and warmer water
                         caused by climate change.  Rising temperatures bleach the coral killing the algae that keep
                         it alive. At the same time <strong>the ocean’s chemistry is changing faster than at any time in the last
                          50 million years</strong>. Excess carbon dioxide absorbed by ocean water is lowering its pH and locking
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
                        <strong>About 70-90% of all existing coral reefs are expected to disappear in the next 20 years</strong> due to
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
                        and birds <a className="external-link -ocean" href="http://ocean.panda.org.s3.amazonaws.com/media/Living_Blue_Planet_Report_2015_08_31.pdf" target="_blank">fell by half</a> (Source: Living Blue Planet Report). <strong>Overfishing is a key reason</strong>.
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
                        <a className="external-link -ocean" href="https://news.mongabay.com/2019/10/commitments-worth-63-billion-pledged-for-ocean-protection/" target="_blank"><strong>Illegal or unregulated fishing is rampant</strong></a>, and traps up to 26 million tons of fish a year, or
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
                        However, recent studies from 2020 have shown
                        that <strong>with proper management, fisheries can rebound</strong>.
                    </p>
                    <p>
                        With intensive management, fisheries have recovered, and fish are twice as abundant
                        fish stocks as they are with no management and research suggests the emerging
                        science of mariculture (ocean aquaculture) could help deliver over 6 times more food
                        than the ocean provides us today.
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
                    <h6 className="ocean">PLASTIC POLLUTION</h6>
                    <p>
                        <strong>A garbage truck's worth of plastic enters the ocean every minute</strong>, harming
                        marine life with unknown consequences. Even though plastic comes from rivers it floats
                        throughout the ocean, swirling with the currents into islands of plastic as large
                        as millions of km across.
                    </p>
                    <p>
                        If this continues, <strong>by 2025 there could be one ton of plastic in the ocean for every three tons of fish</strong>.
                        Plastic bags fishing nets, and other debris choke, strangle and poison, seabirds,
                        sea turtles and fish. Micro-plastic particles they ingest also pose a threat to humans.
                    </p>
                    <p className="text-card-source">
                        Photo by Muntaka Chasant on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/ocean/islands-of-plastic.jpg'
        },
        stickyContainerElement:
            <div className={styles['plastic-world-map']}>
                <img
                    className={styles['map-image']}
                    src="/static/images/scrolly-telling/ocean/world-map.svg"
                />
                <OceanCurrentBox
                    title="North Pacific Gyre"
                    direction="north"
                    style={{
                        position: 'absolute',
                        top: '32%',
                        left: '46%',
                        height: '12%'
                    }} />
                <OceanCurrentBox
                    title="Indian Ocean Gyre"
                    direction="south"
                    style={{
                        position: 'absolute',
                        top: '61%',
                        left: '20%',
                        height: '10%'
                    }} />
                <OceanCurrentBox
                    title="South Pacific Gyre"
                    direction="south"
                    style={{
                        position: 'absolute',
                        top: '61%',
                        left: '61%',
                        height: '10%'
                    }} />
                <OceanCurrentBox
                    title="North Atlantic Gyre"
                    direction="north"
                    style={{
                        position: 'absolute',
                        top: '32%',
                        left: '80%',
                        height: '9%'
                    }} />
                <OceanCurrentBox
                    title="South Atlantic Gyre"
                    direction="south"
                    style={{
                        position: 'absolute',
                        top: '65%',
                        left: '86%',
                        height: '8%'
                    }} />
            </div>
    },
    {
        index: 6,
        textPanel: {
            text:
                <p>
                    <strong>The Great Pacific Garbage Patch</strong> is a collection of marine debris
                     in the North Pacific Ocean. It is <strong>three times the size of France</strong>. Also
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
                    <h6 className="ocean">BENEFITS OF SUSTAINABLE INTERVENTIONS</h6>
                    <p>
                        Governments, companies and citizens must act with urgency to protect our planet’s ocean.
                    </p>
                    <p>
                        Investing sustainably can preserve biodiversity critical ecosystems and build ocean-based
                        industries needed to provide jobs, energy, and food for a growing population.
                    </p>
                    <p>
                        Such investments would be enormously cost-effective: on average, the benefits would be
                        five times greater than the costs. As shown here, benefit/cost ratios would vary,
                        ranging from 3-to-1 to more than 12-to-1.
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
