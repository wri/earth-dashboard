import classnames from 'classnames';

// constants
import {
    FILL_UP_ANIMATION,
    EMPTY_HALF_OUT_ANIMATION,
    BASELINE_WATER_STRESS_ANIMATION,
    WATER_STRESS_RISK_ANIMATION,
    WATER_STRESS_RISK_FINAL
} from './water-drop/constants';

// styles
import styles from './freshwater-scrolly-telling.module.scss';

export const HIGHLIGHT_ORANGE_COLOR = '#D85D44';

export const FRESHWATER_STEPS = [
    {
        index: 0,
        textPanel: {
            text: <p>
                <strong>Every region in the world has a yearly renewable water budget</strong>, available to people, plants and animals living on it. It is represented by this big water droplet. 
                </p>
        }
    },
    {
        index: 1,
        textPanel: {
            text: <>
                    <h6 className="freshwater">FRESHWATER SUPPLIES</h6>
                    <p><strong>On the supply side</strong>, that water comes in the form of rainfall, rivers, lakes and other sources. That’s the amount of water that the region can naturally replenish every year.</p>
                    <p className={styles['photo-subtitle']}>Photo by Kevin Dooley on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a></p>
                </>,
                imageHeader: '/static/images/scrolly-telling/freshwater/freshwater-supplies.jpg'
        },
        dropAnimation: FILL_UP_ANIMATION
    },
    {
        index: 2,
        textPanel: {
            text: <>
                <h6 className="freshwater">FRESHWATER WITHDRAWALS</h6>
                <p>
                    From that budget, <strong>people withdraw water</strong> to use it in their homes, to 
                    run factories, to irrigate fields and for the livestock they raise.
                </p>
                <p className={styles['photo-subtitle']}>Photo by Ken Figlioli on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a></p>
            </>,
            imageHeader: '/static/images/scrolly-telling/freshwater/freshwater-withdrawals.jpg'
        },
        dropAnimation: EMPTY_HALF_OUT_ANIMATION
    },
    {
        index: 3,
        textPanel: {
            text:
                <p>
                    Ideally, no region should withdraw more water than it can naturally replenish. <strong>Baseline water stress</strong> measures
                     the ratio of total water withdrawals to available renewable surface and groundwater 
                    supplies. It is expressed as a percentage. <a className="external-link -freshwater" href="https://resourcewatch.org/data/explore/wat050-Aqueduct-Baseline-Water-Stress" target="_blank">These risk scores range from low water stress
                     (&lt;10%) to extremely high water stress (&gt;80%)</a>.
                </p>
        },
        dropAnimation: BASELINE_WATER_STRESS_ANIMATION
    },
    {
        index: 4,
        textPanel: {
            text: <>
                <h6 className="freshwater">WATER STRESS RISK</h6>
                <p>If a region overspends its budget, we say it has a high water stress risk. Among the consequences are:</p>
                <ul>
                    <li>It has to <strong>import water</strong> from other regions</li>
                    <li>It has to <strong>use non-renewable groundwater sources</strong>, which run the risk of depletion</li>
                    <li>It has to <strong>build reservoir infrastructure</strong> with high ecological impact</li>
                    <li>It will be <strong>less resilient to natural hazards</strong> such as droughts, desertification, etc.</li>
                </ul>
                <p className={styles['photo-subtitle']}>Photo by John Gibbons on Unsplash</p>
            </>,
            imageHeader: '/static/images/scrolly-telling/freshwater/water-stress-risks.jpg'

        },
        dropAnimation: WATER_STRESS_RISK_ANIMATION
    },
    {
        index: 5,
        textPanel: {
            text: <p>
                Let’s explore some regions of the work with <strong>extremely high water stress risk</strong> (&gt;80%)
            </p>
        },
        dropAnimation: WATER_STRESS_RISK_FINAL
    }
];

export const FRESHWATER_STEPS_WORLDMAP = [
    {
        index: 0,
        textPanel: {
            text:
                <>
                    <h6 className="freshwater">Middle East and North Africa (MENA)</h6>
                    <p>
                        <strong>This region is home to 12 of the world’s 17 most water stressed countries</strong>. Climate change will make water still scarcer by 2050 causing economic losses ranging from six to 14 percent of GDP.
                     </p>
                </>
        }
    },
    {
        index: 1,
        textPanel: {
            text:
                <>
                    <h6 className="freshwater">Chennai, India</h6>
                    <p>
                    <a className="external-link -freshwater" href="https://www.wri.org/blog/2019/06/how-does-flood-prone-city-run-out-water-inside-chennai-day-zero-crisis" target="_blank">Reservoirs in Chennai nearly ran dry</a>, forcing the city’s 10 million residents to buy water or draw it 
                    from wells, further draining aquifers.  India’s water sources are being depleted and researchers 
                    say <strong>the nation faces the worst water crisis in its history</strong>. 
                     </p>
                </>
        }
    },
    {
        index: 2,
        textPanel: {
            text:
                <>
                    <h6 className="freshwater">Cape Town, South Africa</h6>
                    <p>
                    <strong>Three years of drought</strong> left Cape Town facing the spectre of “Day Zero,” the day South 
                    Africa’s second largest city government would need to <a className="external-link -freshwater" href="https://www.nytimes.com/2018/01/30/world/africa/cape-town-day-zero.html" target="_blank">shut off water taps</a> for 
                    most homes and businesses. Aggressive conservation measures and rain spared the city.
                    </p>
                </>
        }
    },
    {
        index: 3,
        textPanel: {
            text:
                <>
                    <h6 className="freshwater">Rome, Italy</h6>
                    <p>
                        Rome endured months with hardly any rain - <strong>a drop of 70%</strong> from previous years. 
                        The city resorted to cutting water pressure during the night on peak days. Some in 
                        tall buildings lost service. The Vatican turned off its 100 fountains.  
                    </p>
                </>
        }
    } 
];

export const FRESHWATER_WATER_DROP_LOCATIONS = [
    {
        index: 0,
        top: 31.5,
        left: 58
    },
    {
        index: 1,
        top: 44.5,
        left: 70.5
    },
    {
        index: 2,
        top: 80,
        left: 54
    },
    {
        index: 3,
        top: 24,
        left: 52.5
    }
];