import classnames from 'classnames';

// components
import OceanCurrentBox from './ocean-current-box';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './oceans-scrolly-telling.module.scss';

const getTrendsInMarineFishStock = () =>
    <MediaContextProvider>
        <Desktop>
            <div className={styles['chart-with-title']}>
                <div>
                    <h6>Trends in Marine Fish Stocks</h6>
                    <img src="/static/images/scrolly-telling/oceans/trends-in-marine-fish-stocks.svg" />
                </div>
            </div>
        </Desktop>
        <Mobile>
            <div className={classnames({
                [styles['chart-with-title']]: true,
                [styles['-mobile']]: true
            })}>
                <div>
                    <h6>Trends in Marine Fish Stocks</h6>
                    <img src="/static/images/scrolly-telling/oceans/trends-in-marine-fish-stocks.svg" />
                </div>
            </div>
        </Mobile>
    </MediaContextProvider>;

export const OCEANS_STEPS_INTRO = [
    {
        index: 0,
        textPanel: {
            text:
                <div>
                    <h6>Ocean uses</h6>
                    <h6 className={styles.subheader}>ACCELERATING USES OF OCEAN RESOURCES</h6>
                    <p>
                        The ocean is relied upon for a diversity of uses, all of which area increasing at an unprecedented rate.
                    </p>
                    <p>
                        <strong>Human impacts on the ocean have been increasing since 1970</strong>. The
                        hope is that the ocean can deliver as an economic frontier, but each of
                        these pressures are increasing in isolation of one another, creating a new risk landscape
                    </p>
                </div>
        }
    }
];

export const OCEANS_STEPS = [
    {
        index: 0,
        textPanel: {
            text:
                <div>
                    <h6>Threats to the Ocean</h6>
                    <h6 className={styles.subheader}>CORAL BLEACHING AND ACIDIFICATION</h6>
                    <p>
                        Tipping points are approaching for coral reef survival and ocean acidification as
                        climate change warms waters. Rising temperatures bleach the coral killing the
                        algae that keep it alive.  At the same
                         time <strong>the ocean’s chemistry is changing faster than at any time in the last 50 million years</strong>.
                         Excess carbon dioxide is lowering the water’s pH and locking up the carbonate ions
                          sea creatures need to extract to build shells and reefs.
                    </p>
                    <p className={styles['text-card-source']}>
                        Photo by NMSAS on Wikimedia Commons (Public domain)
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/oceans/threats-to-the-ocean.jpg'
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
                    <h6>Threats to the Ocean</h6>
                    <h6 className={styles.subheader}>PROJECTED CORAL DEATH</h6>
                    <p>
                        In the last 30 years, nearly half of the world’s coral has
                         died. <strong>About 70-90% of all existing coral reefs (marked in red on the map) are expected to disappear in the next 20 years</strong> due
                         to warming oceans, more acidic water and pollution.
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
                    <h6>Fisheries under pressure</h6>
                    <h6 className={styles.subheader}>INCREASE IN FISHERIES AND FOOD DEMAND FROM THE OCEAN</h6>
                    <p>
                        Between 1970 and 2012, populations of fish and other marine vertebrates such
                        as mammals, reptiles and birds fell by half. Overfishing is a key reason.
                    </p>
                    <p>
                        In 1974, only one out of ten UN-monitored fish stocks are were harvested beyond
                         sustainable levels. <strong>Today, that number has climbed to a third</strong>. This
                         means that they cannot reproduce as fast as they are being killed.
                    </p>
                    <p className={styles['text-card-source']}>
                        Photo by Ed Dunens on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a>
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/oceans/fisheries-under-pressure.jpg'
        },
        stickyContainerElement: getTrendsInMarineFishStock()


    },
    {
        index: 3,
        textPanel: {
            text:
                <div>
                    <p>
                        Illegal or unregulated fishing is rampant, and traps up to 26 million tons of fish
                        a year, or up to a third of high-value fish taken.
                    </p>
                    <p>
                        Bycatch, the netting of unwanted sea life, kills billions of fish, along with
                        seabirds, sea turtles, dolphins, and sharks, driving some species to the brink of extinction.
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
                            <h6>Aquaculture and fisheries</h6>
                            <img src="/static/images/scrolly-telling/oceans/aquaculture-and-fisheries.svg" />
                        </div>
                    </div>
                </Desktop>
                <Mobile>
                    <div className={classnames({
                        [styles['chart-with-title']]: true,
                        [styles['-mobile']]: true
                    })}>
                        <div>
                            <h6>Aquaculture and fisheries</h6>
                            <img src="/static/images/scrolly-telling/oceans/aquaculture-and-fisheries.svg" />
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
                    <h6>Islands of plastic</h6>
                    <h6 className={styles.subheader}>PLASTIC POLLUTION</h6>
                    <p>
                        <strong>A garbage truck's worth of plastic enters the ocean every minute</strong>, harming
                        marine life with unknown consequences. Even though plastic comes from rivers it floats
                        throughout the oceans, swirling with the currents into islands of plastic as large
                        as millions of km across.
                    </p>
                    <p>
                        If this continues, <strong>by 2025 there could be one ton of plastic in the ocean for every three tons of fish</strong>.
                        Plastic bags fishing nets, and other debris choke, strangle and poison, seabirds,
                        sea turtles and fish. Micro-plastic particles they ingest also pose a threat to humans.
                    </p>
                    <p className={styles['text-card-source']}>
                        Photo by Muntaka Chasant on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/oceans/islands-of-plastic.jpg'
        },
        stickyContainerElement:
            <div className={styles['plastic-world-map']}>
                <img
                    className={styles['map-image']}
                    src="/static/images/scrolly-telling/oceans/world-map.svg"
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
                    src="/static/images/scrolly-telling/oceans/world-map.svg"
                />
            </div>
    },
    {
        index: 7,
        textPanel: {
            text:
                <div>
                    <h6>Ocean Industries</h6>
                    <h6 className={styles.subheader}>BENEFITS OF SUSTAINABLE INTERVENTIONS</h6>
                    <p>
                        Governments, companies and citizens must act with urgency to protect our planet’s oceans.
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
                    <p className={styles['text-card-source']}>
                        Photo by Nicholas Doherty on Unsplash
                    </p>
                </div>,
            imageHeader: '/static/images/scrolly-telling/oceans/ocean-industries.jpg'
        },
        stickyContainerElement:
            <div className={styles['chart-with-title']}>
                <div>
                    <h6>Benefit-cost ratios for sustainable ocean interventions</h6>
                    <img src="/static/images/scrolly-telling/oceans/benefit-cost-ratios-for-sustainable-ocean-interventions.svg" />
                </div>
            </div>
    }
];
