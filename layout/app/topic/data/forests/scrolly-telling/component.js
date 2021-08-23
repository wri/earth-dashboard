import { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { getColorByTopic } from 'utils/topics';
import { MediaContextProvider, Desktop, Mobile } from 'utils/responsive';

// constants
import { FORESTS_STEPS } from './constants';

// styles
import styles from './forests-scrolly-telling.module.scss';

function ForestsScrollyTelling({ topic }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [currentYear, setCurrentYear] = useState(2000);
    const isBrowser = typeof window !== 'undefined';
    const currentStep = FORESTS_STEPS[currentStepIndex];
    const topicColor = getColorByTopic(topic);

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);

        const step = FORESTS_STEPS[data];
        const { showYearCounter, yearValue, previousYearValue } = step;

        // ------ YEAR COUNTER COUNT UP EFFECT ------------------
        if (showYearCounter) {
            if (previousYearValue && yearValue) {
                for (let i = previousYearValue, j = 0; i <= yearValue; i++, j++) {
                    setTimeout(() => {
                        setCurrentYear(i)
                    }, j * 50);
                }
            } else if (yearValue) {
                setCurrentYear(yearValue);
            }
        }
        // ------------------------------------------------------
    };

    const getStepContent = (mobile = false, step) =>
        <div className={classnames({
            'text-box-container': true,
            '-desktop': !mobile,
            '-mobile': mobile,
        })}>
            <TextBox
                text={step.textPanel.text}
                imageHeader={step.textPanel.imageHeader}
            />
        </div>;

    const getVisualSources = (mobile) =>
        <div className={classnames({
            [styles['visual-sources']]: true,
            [styles['-mobile']]: mobile,
            [styles['-desktop']]: !mobile,
            [styles['-show-year']]: currentStep.showYearCounter
        })}>
            {currentStep.visualSource &&
                <div className={styles.source}>
                    Source: {currentStep.visualSource}
                </div>
            }
            {currentStep.visualDataset &&
                <div className={styles.dataset}>
                    Dataset: {currentStep.visualDataset}
                </div>
            }
        </div>

    const getYearContainer = (mobile) =>
        <>
            <div
                className={classnames({
                    [styles['year-value']]: true,
                    [styles['-mobile']]: mobile,
                    [styles['-desktop']]: !mobile,
                    [styles['-long-year']]: !!currentStep.yearValuePrefix
                })}
                style={{ color: topicColor }}
            >
                {currentStep.yearValuePrefix && currentStep.yearValuePrefix}{currentYear}
            </div>
            <div className={classnames({
                [styles['year-subtitle']]: true,
                [styles['-mobile']]: mobile,
                [styles['-desktop']]: !mobile,
                [styles['-long-year']]: !!currentStep.yearValuePrefix
            })}
            >
                {currentStep.yearSubtitle}
            </div>
        </>;

    return (
        <div
            className={styles['c-forests-scrolly-telling']}
        >
            <MediaContextProvider>
                <div className={styles.story}>
                    <div className={styles['sticky-container']}>
                        <div className={styles['wrapper-container']}>
                            <Desktop>
                                {currentStep.stickyContainerElement &&
                                    <div className={classnames({
                                        [styles['sticky-element']]: true,
                                        [styles['-desktop']]: true
                                    })}>
                                        {currentStep.stickyContainerElement}
                                    </div>
                                }
                                {getVisualSources(false)}
                            </Desktop>
                            <Mobile>
                                {currentStep.stickyContainerElement &&
                                    <div className={classnames({
                                        [styles['sticky-element']]: true,
                                        [styles['-mobile']]: true
                                    })}>
                                        {currentStep.stickyContainerElement}
                                    </div>
                                }
                                {getVisualSources(true)}
                            </Mobile>
                            {currentStep.showYearCounter &&
                                <>
                                    <Desktop className={classnames({
                                        [styles['year-container']]: true,
                                        [styles['-desktop']]: true
                                    })}>
                                        {getYearContainer(false)}
                                    </Desktop>
                                    <Mobile className={classnames({
                                        [styles['year-container']]: true,
                                        [styles['-mobile']]: true
                                    })}>
                                        {getYearContainer(true)}
                                    </Mobile>
                                </>
                            }
                        </div>
                    </div>

                    {isBrowser &&
                        <div className={styles.steps}>
                            <Scrollama
                                onStepEnter={onStepEnter}
                                offset={0.6}
                            >
                                {FORESTS_STEPS.map((step, stepIndex) =>
                                    <Step data={stepIndex} key={`step-${stepIndex}`}>
                                        <div>
                                            <Mobile>
                                                {getStepContent(true, step)}
                                            </Mobile>
                                            <Desktop>
                                                {getStepContent(false, step)}
                                            </Desktop>
                                        </div>
                                    </Step>
                                )}
                            </Scrollama>
                        </div>
                    }
                </div>
            </MediaContextProvider>
        </div >
    );
}

export default ForestsScrollyTelling;