import React from 'react';

// components
import PulsatingItem from 'components/ui/pulsating-item';

// utils
import {
    MediaContextProvider,
    Mobile,
    Desktop,
    DesktopLarge,
    DesktopXLarge
} from 'utils/responsive';

// styles
import styles from './tipping-point-chart.module.scss';

// data
import { TIPPING_POINT_CHART_SVG } from './data';

function TippingPointChart() {
    const getContent = (mode) => <>
        <div className={styles.chart}>
            {TIPPING_POINT_CHART_SVG}
        </div>
        <div className={styles.marker}>
            <PulsatingItem />
        </div>
    </>;
    return (
        <div className={styles['c-tipping-point-chart']}>
            <MediaContextProvider>
                <Mobile>{getContent('mobile')}</Mobile>
                <Desktop>{getContent('desktop')}</Desktop>
                <DesktopLarge>{getContent('desktop-large')}</DesktopLarge>
                <DesktopXLarge>{getContent('desktop-x-large')}</DesktopXLarge>
            </MediaContextProvider>
        </div>
    );
}

export default TippingPointChart;