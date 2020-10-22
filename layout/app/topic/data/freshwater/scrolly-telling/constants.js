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
    },
    {
        index: 7,
        textPanel: {
            text: <p>
                Some text for the map here?
            </p>
        }
    }
];