import classnames from 'classnames';

// styles
import styles from './forests-scrolly-telling.module.scss';

export const FORESTS_STEPS = [
    {
        index: 0,
        textPanel: {
            text: <p>
                This is a map of the Amazon region in South America. The <strong>Amazon rainforest</strong> covers 597 Mha across nine countries and harbors 16,000 tree species.
            </p>
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
                The tiny trees here represent the estimated 514 Mha of <strong>tree cover present in the Amazon in the year 2000</strong>. That would be a tree cover area equivalent to <strong>12.5 Californias</strong>
            </p>
        },
        showYearCounter: true,
        yearValue: 2000,
        stickyContainerElement: 
            <div className={styles['-align-right']}>
                <img src="/static/images/scrolly-telling/forests/trees1.svg" />
            </div>
    },
    {
        index: 2,
        textPanel: {
            text: <p>
                To get an idea of the scale, <strong>one tree</strong> represents 4.2 million Ha of tree cover, equivalent to <strong>an area the size of Switzerland</strong>
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
                Let’s fast forward to 2019. This is how much of that 2000 tree cover is left. In these nineteen years, <strong>the Amazon has lost an area equivalent to the size of 9 Switzerlands since 2000</strong>.            </p>
        },
        showYearCounter: true,
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
                <p>
                    But what have been the <strong>main drivers</strong> of tree cover loss in the Amazon in these 19 years? 
                </p>
                <p>
                    According to the available data, we see that the main driver is commodity driven deforestation, which includes activities like industrial mining, oil extraction and shifting agriculture.
                </p>
            </>
        },
        showYearCounter: true,
        yearValue: 2019,
        yearSubtitle: 'Main drivers of tree cover loss in the Amazon basin',
        stickyContainerElement: 
            <div className={styles['-align-right']}>
                <img src="/static/images/scrolly-telling/forests/drivers_of_tree_cover_loss_chart.png" />
            </div>
    },
    {
        index: 5,
        textPanel: {
            text: <p>
                If current trends continue, <strong>the Amazon rainforest will become a net carbon emitter in 2035</strong>. That means it won’t be a carbon sink anymore, but will turn into a carbon source.
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
                <div className={styles['pulsating-dot']}>
                    <img src="/static/images/scrolly-telling/forests/pulsating_dot.svg" />
                </div>
            </div>
    }
];