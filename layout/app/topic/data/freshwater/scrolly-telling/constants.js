import classnames from 'classnames';

// styles
import styles from './freshwater-scrolly-telling.module.scss';

export const HIGHLIGHT_ORANGE_COLOR = '#D85D44';

export const FRESHWATER_STEPS = [
    {
        index: 0,
        textPanel: {
            text: <p>Every region in the world has a <strong>yearly renewable water budget</strong>, available to the people, plants and animals living on it. It is represented by that big drop of water.</p>
        },
        dropImage: <img src="/static/images/scrolly-telling/freshwater/drop.svg" />
    },
    {
        index: 1,
        textPanel: {
            text: <><p>On the <strong>supply side</strong>, that water comes in the form of rainfall, rivers, lakes and other groundwater sources.</p>
                <p>That’s the amount of water that the region can naturally replenish <strong>every year</strong>. </p></>
        }
        ,
        dropImage: <img src="/static/images/scrolly-telling/freshwater/drop_full.svg" />,
        extraElement:
            <div className={styles['arrow-container']}>
                <img src="/static/images/scrolly-telling/freshwater/arrow_up.svg" />
            </div>
    },
    {
        index: 2,
        textPanel: {
            text: <p>From that budget, <strong>people withdraw water</strong> to use it in their homes, to run factories, to irrigate fields and for the livestock they raise.</p>
        },
        dropImage: <img src="/static/images/scrolly-telling/freshwater/drop.svg" />,
        extraElement:
            <div className={styles['arrow-container']}>
                <img src="/static/images/scrolly-telling/freshwater/arrow_down.svg" />
            </div>
    },
    {
        index: 3,
        textPanel: {
            text: <>
                <p>Ideally, no region should withdraw more water that it can naturally replenish.</p>
                <p><strong>Baseline water stress</strong> measures the ratio of total water withdrawals to available renewable surface and groundwater supplies.</p>
                <p>It is expressed as a percentage.  These risk scores range from low water stress ({'<'}10%) to extremely high water stress ({'>'}80%)</p>
            </>
        },
        dropImage: <img src="/static/images/scrolly-telling/freshwater/drop.svg" />,
        extraElement:
            <div className={styles['baseline-water-stress-container']}>
                <div className={styles['divider-container']}>
                    <span>withdrawals</span>
                    <img src="/static/images/scrolly-telling/freshwater/divider.svg" />
                    <span>supplies</span>
                </div>
                <div className={styles['arrow-up-and-down-container']}>
                    <img src="/static/images/scrolly-telling/freshwater/arrow_up_and_down.svg" />
                </div>
            </div>
    },
    {
        index: 4,
        textPanel: {
            text: <>
                <p>If a region overspends its budget, we say it has a <span style={{ color: HIGHLIGHT_ORANGE_COLOR }}><strong>high water stress risk</strong></span>. Among the consequences are:</p>
                <ul>
                    <li>It has to <strong>import water</strong> from other regions</li>
                    <li>It has to <strong>use non-renewable</strong> groundwater sources, which run the risk of depletion</li>
                    <li><strong>Build reservoir infrastructures</strong> with high ecological impact</li>
                    <li><strong>Be less resilient to natural hazards</strong> such as droughts, desertification, etc.</li>
                </ul>
            </>
        },
        dropImage: <img src="/static/images/scrolly-telling/freshwater/drop.svg" />,
        extraElement:
            <div className={classnames({
                [styles['baseline-water-stress-container']]: true,
                [styles['-high-water-stress-risk']]: true
            })}>
                <div className={styles['divider-container']}>
                    <span>withdrawals</span>
                    <img src="/static/images/scrolly-telling/freshwater/divider.svg" />
                    <span>supplies</span>
                </div>
                <div className={styles['arrow-up-and-down-container']}>
                    <img src="/static/images/scrolly-telling/freshwater/arrow_up_and_down.svg" />
                </div>
            </div>
    },
    {
        index: 5,
        textPanel: {
            text: <p>
                Let's explore some regions in the world with extremely high <span style={{ color: HIGHLIGHT_ORANGE_COLOR }}><strong>water stress risk</strong></span> ({'>'}80%)
            </p>
        },
        dropImage: <img src="/static/images/scrolly-telling/freshwater/drop.svg" />
    }
];

export const FRESHWATER_STEPS_WORLDMAP = [
    {
        index: 0,
        textPanel: {
            text:
                <>
                    <h6>Middle East and North Africa (MENA)</h6>
                    <p>
                        This region is home to 12 of the world’s 17 most water stressed countries.  Climate change will make water still scarcer by 2050 causing economic losses ranging from six to 14 percent of GDP.
                     </p>
                </>
        }
    },
    {
        index: 1,
        textPanel: {
            text:
                <>
                    <h6>Chennai, India</h6>
                    <p>
                        Reservoirs in <a className="external-link -freshwater" target="_blank" href="https://www.wri.org/blog/2019/06/how-does-flood-prone-city-run-out-water-inside-chennai-day-zero-crisis">Chennai</a> nearly ran dry, forcing the city’s 10 million residents to buy water or draw it from wells, further draining aquifers.  India’s water sources are being depleted and researchers say the nation faces the worst water crisis in its history.
                     </p>
                </>
        }
    },
    {
        index: 2,
        textPanel: {
            text:
                <>
                    <h6>Cape Town, South Africa</h6>
                    <p>
                        Three years of drought left Cape Town facing the spectre of “Day Zero,” the day South Africa’s second largest city government would need to <a className="external-link -freshwater" target="_blank" href="https://www.nytimes.com/2018/01/30/world/africa/cape-town-day-zero.html">shut off</a> water taps for most homes and businesses. Aggressive conservation measures and rain spared the city.                     
                    </p>
                </>
        }
    },
    {
        index: 3,
        textPanel: {
            text:
                <>
                    <h6>Rome, Italy</h6>
                    <p>
                        Rome endured months with hardly any rain - a drop of 70% from previous years.  The city resorted to cutting water pressure during the night on peak days.  Some in tall buildings lost service.  The Vatican turned off its 100 fountains.                    
                    </p>
                </>
        }
    } 
];

export const FRESHWATER_WATER_DROP_LOCATIONS = [
    {
        index: 0,
        top: 31.5,
        left: 55.5
    },
    {
        index: 1,
        top: 44.5,
        left: 68
    },
    {
        index: 2,
        top: 80,
        left: 51.5
    },
    {
        index: 3,
        top: 24,
        left: 50
    }
];