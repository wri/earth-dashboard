import classnames from 'classnames';

// styles
import styles from './forests-scrolly-telling.module.scss';

export const FORESTS_STEPS = [
    {
        index: 0,
        textPanel: {
            text: <>
                <h6 className="forests">The Amazon Rainforest</h6>
                <p>
                    The Amazon rainforest covers <a className="external-link -forests" href="https://www.nature.com/articles/d41586-020-00508-4" target="_blank"><strong>597 Mha across nine countries and harbors 16,000 tree species</strong></a>.
                </p>
            </>
        },
        showYearCounter: false,
        stickyContainerElement: 
            <div className={classnames({
                [styles['-align-right']]: true,
                [styles['south-america-map']]: true
            })}>
                <img src="/static/images/scrolly-telling/forests/amazon_map.svg" />
            </div>
    },
    {
        index: 1,
        textPanel: {
            text: <p>
                The tiny trees here represent the estimated <strong>514 million hectares of tree cover present in the Amazon in the year 2000</strong>. That is an area the size of 12.5 Californias.
            </p>
        },
        showYearCounter: true,
        yearValue: 2000,
        stickyContainerElement: 
            <div className={classnames({
                [styles['-align-right']]: true,
                [styles['south-america-map-dissolved']]: true
            })}>
                <img className={styles['map-image']} src="/static/images/scrolly-telling/forests/amazon_map.svg" />
                <img src="/static/images/scrolly-telling/forests/trees1.svg" />
            </div>
    },
    {
        index: 2,
        textPanel: {
            text: <p>
                Each tree represents <strong>an area the size of Switzerland</strong> (4.2 million hectares of tree cover).
            </p>
        },
        showYearCounter: true,
        yearValue: 2000,
        yearSubtitle: '513.8 Mha of tree cover in the Amazon basin',
        stickyContainerElement: 
            <div className={styles['-align-right']}>
                <img src="/static/images/scrolly-telling/forests/trees2.svg" />
            </div>
    },
    {
        index: 3,
        textPanel: {
            text: <p>
                    Let’s fast forward to 2019. The saws represent <strong>how much of that tree cover has been lost</strong>. In these 19 years, <strong>the Amazon has lost an area equivalent to the size of 9 Switzerlands</strong>.
                </p>
        },
        showYearCounter: true,
        previousYearValue: 2000,
        yearValue: 2019,
        yearSubtitle: '494,9 Mha of tree cover in the Amazon basin',
        stickyContainerElement: 
            <div className={styles['-align-right']}>
                <img src="/static/images/scrolly-telling/forests/trees3.svg" />
            </div>
    },
    {
        index: 4,
        textPanel: {
            text: 
                <>
                <h6 className="forests">Drivers of Tree Cover Loss</h6>
                <p>
                    The main driver of tree cover loss in the Amazon is commodity driven deforestation, which includes activities like oil extraction, industrial mining, ranching, farming, and fires set to clear land.
                </p>
            </>
        },
        showYearCounter: true,
        yearValue: 2019,
        yearSubtitle: 'Main drivers of tree cover loss in the Amazon basin',
        stickyContainerElement: 
            <div className={classnames({
                [styles['-align-right']]: true,
                [styles['horizontal-bar-chart']]: true
            })}>
                <img src="/static/images/scrolly-telling/forests/drivers_of_tree_cover_loss_chart.png" />
            </div>
    },
    {
        index: 5,
        textPanel: {
            text: <p>
                If current trends continue, <strong>the remaining intact Amazon rainforest may become a net carbon emitter in 2035</strong>. That means it  won’t be a carbon sink anymore, but will turn into a <strong>carbon source</strong>. This trend is dominated by the drier parts of the Amazon; wetter forests may remain sinks for much longer.
            </p>
        },
        showYearCounter: false,
        stickyContainerElement: 
            <div className={classnames({
                [styles['-align-center']]: true,
                [styles['chart-pulsating-dot']]: true
            })}>
                <div className={styles['chart']}>
                    <img src="/static/images/scrolly-telling/forests/tipping_point_chart.svg" />
                </div>
                <div className="pulsating-circle">
                    <img src="/static/images/scrolly-telling/forests/pulsating_dot.svg" />
                </div>
            </div>
    }
];