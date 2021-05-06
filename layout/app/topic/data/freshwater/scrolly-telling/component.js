import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';
import WaterDrop from './water-drop';
import WaterDropLocations from './water-drop-locations';

// utils
import {
    Mobile,
    Desktop,
    MediaContextProvider,
    DesktopLarge,
    DesktopXLarge,
    DesktopXXLarge
} from 'utils/responsive';

// constants
import {
    FRESHWATER_STEPS,
    FRESHWATER_STEPS_WORLDMAP
} from './constants';

// styles
import styles from './freshwater-scrolly-telling.module.scss';

function FreshwaterScrollyTelling() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [currentStepIndexWorldMap, setCurrentStepIndexWorldMap] = useState(0);
    const isBrowser = typeof window !== 'undefined';


    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };
    const onStepEnterWorldMap = ({ data }) => {
        setCurrentStepIndexWorldMap(data);
    };

    const getWaterDropElements = () =>
        <div className={styles['water-drop-elements']}>
            <WaterDrop mode={FRESHWATER_STEPS[currentStepIndex].dropAnimation} />
            {FRESHWATER_STEPS[currentStepIndex].extraElement}
        </div>;

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

    const getWorldMapScrollama = () =>
        <Scrollama
            onStepEnter={onStepEnterWorldMap}
            offset={0.8}
        >
            {FRESHWATER_STEPS_WORLDMAP.map((step, stepIndex) =>
                <Step data={stepIndex} key={`step-${stepIndex}`}>
                    <div>
                        <Desktop>
                            {getStepContent(false, step)}
                        </Desktop>
                        <Mobile>
                            {getStepContent(true, step)}
                        </Mobile>
                    </div>
                </Step>
            )}
        </Scrollama>;

    const getWaterDropScrollama = () =>
        <Scrollama
            onStepEnter={onStepEnter}
            offset={0.5}
        >
            {FRESHWATER_STEPS.map((step, stepIndex) =>
                <Step data={stepIndex} key={`step-${stepIndex}`}>
                    <div>
                        <Desktop>
                            {getStepContent(false, step)}
                        </Desktop>
                        <Mobile>
                            {getStepContent(true, step)}
                        </Mobile>
                    </div>
                </Step>
            )}
        </Scrollama>;

    const getVisualSources = (mobile, worldmapStory) => {
        const currentStep = worldmapStory ? FRESHWATER_STEPS_WORLDMAP[currentStepIndexWorldMap] :
            FRESHWATER_STEPS[currentStepIndex];
        return (
            <div className={classnames({
                [styles['visual-sources']]: true,
                [styles['-mobile']]: mobile,
                [styles['-desktop']]: !mobile
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
        );
    };

    const getWaterDropStory = (mode) =>
        <>
            <div className={classnames({
                [styles['water-drop-container']]: true,
                [styles[`-${mode}`]]: true
            })}>
                {getWaterDropElements()}
                {getVisualSources(mode === 'mobile', false)}
            </div>
            {isBrowser &&
                <div className={classnames({
                    [styles.steps]: true,
                    [styles[`-${mode}`]]: true
                })}>
                    {getWaterDropScrollama()}
                </div>
            }
        </>;

    return (
        <div
            className={styles['c-freshwater-scrolly-telling']}
        >
            <MediaContextProvider>
                <Desktop includeBiggerScreens={false} className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-desktop']]: true
                })}
                >
                    {getWaterDropStory('desktop')}
                </Desktop>
                <DesktopLarge includeBiggerScreens={false} className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-desktop-large']]: true
                })}
                >
                    {getWaterDropStory('desktop-large')}
                </DesktopLarge>
                <DesktopXLarge includeBiggerScreens={false} className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-desktop-xlarge']]: true
                })}
                >
                    {getWaterDropStory('desktop-xlarge')}
                </DesktopXLarge>
                <DesktopXXLarge includeBiggerScreens={false} className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-desktop-xxlarge']]: true
                })}
                >
                    {getWaterDropStory('desktop-xxlarge')}
                </DesktopXXLarge>
                <Mobile className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-mobile']]: true
                })}
                >
                    {getWaterDropStory('mobile')}
                </Mobile>
                <div
                    className={classnames({
                        [styles.story]: true,
                        [styles['worldmap-story']]: true
                    })}
                >
                    <div className={styles['worldmap-container']}>
                        <WaterDropLocations activeIndex={currentStepIndexWorldMap} />
                        {getVisualSources(false, true)}
                    </div>
                    {isBrowser &&
                        <>
                            <Desktop className={classnames({
                                [styles.steps]: true,
                                [styles['-desktop']]: true
                            })}>
                                {getWorldMapScrollama()}
                            </Desktop>
                            <Mobile className={classnames({
                                [styles.steps]: true,
                                [styles['-mobile']]: true
                            })}>
                                {getWorldMapScrollama()}
                            </Mobile>
                        </>
                    }
                </div>
            </MediaContextProvider>
        </div>
    );
}

export default FreshwaterScrollyTelling;