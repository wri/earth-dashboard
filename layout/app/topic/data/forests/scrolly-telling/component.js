import React, { useState } from 'react';
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
                for(let i=previousYearValue, j=0; i<= yearValue; i++, j++) {
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
            [styles['-desktop']]: !mobile,
            [styles['-mobile']]: mobile,
        })}>
            <TextBox
                text={step.textPanel.text}
                imageHeader={step.textPanel.imageHeader}
            />
        </div>;

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
                            </Mobile>
                            {currentStep.showYearCounter &&
                                <div className={styles['year-container']}>
                                    <div
                                        className={styles['year-value']}
                                        style={{ color: topicColor }}
                                    >
                                        {currentYear}
                                    </div>
                                    <div className={styles['year-subtitle']}>
                                        {currentStep.yearSubtitle}
                                    </div>
                                </div>
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