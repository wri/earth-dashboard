import classnames from 'classnames';

// styles
import styles from './climate-scrolly-telling.module.scss';

export const CLIMATE_STEPS = [
    {
        index: 0,
        textPanel: {
            text: 
            <>
                <p>
                    Take a look at this line. This chart shows how the global surface temperatures have evolved since 1880.
                </p>
                <p>
                    <strong>Current temperatures are 0.9 °C degrees warmer relative to 1951-1980 average temperatures.</strong>
                </p>
            </>
        },
        showYearCounter: true,
        yearValue: '2020 +1.0 °C',
        yearSubtitle: 'Present time'
    },
    {
        index: 1,
        textPanel: {
            text: <p>
                <strong>1.0 °C</strong> might not seem like much, but let’s  take a look at the <strong>implications for the Earth’s global commons</strong>. These events are not far into the future, but already happening now.
            </p>
        },
        showYearCounter: true,
        yearValue: '2020 +1.0 °C',
        yearSubtitle: 'Present time'
    },
    {
        index: 2,
        textPanel: {
            text: 
            <>
                <img src="" />
                <h6>FIRES</h6>
                <p>
                    In Australia, last season, fires consumed an area larger than South Korea and killed 
                    or harmed <strong>3 billion animals</strong>.
                </p>
                <p className={styles['photo-subtitle']}>Photo by Peter Buschmann on Wikimedia Commons (Public domain)</p>
            </>
        },
        showYearCounter: true,
        yearValue: '2020 +1.0 °C',
        yearSubtitle: 'Present time'
    },
    {
        index: 5,
        textPanel: {
            text: 
            <>
                <p>
                    <strong>Let’s take a look at future temperatures and what scientists think might happen.</strong>
                </p>
                <p>
                    Predicting the future is hard, so scientists use confidence intervals, which are minimum and maximum
                     estimates between which the actual temperatures might fluctuate. These are represented by the gray area on the chart.
                </p>
                <p>
                    The dotted orange line represents the mean values between those intervals.
                </p>
            </>
        },
        showYearCounter: true,
        yearValue: '2020 +1.0 °C',
        yearSubtitle: 'Present time'
    },
    {
        index: 5,
        textPanel: {
            text: 
                <p>Let's zoom the chart to the future</p>
        },
        showYearCounter: true,
        yearValue: '2020 +1.0 °C',
        yearSubtitle: 'Present time'
    }
];