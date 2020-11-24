import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';
import WaterDrop from './water-drop';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// constants
import {
    FRESHWATER_STEPS,
    FRESHWATER_STEPS_WORLDMAP,
    FRESHWATER_WATER_DROP_LOCATIONS
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
        console.log('onStepEnter!', data);
    };
    const onStepEnterWorldMap = ({ data }) => {
        setCurrentStepIndexWorldMap(data);
        console.log('onStepEnter WorldMap!', data);
    };

    const getWaterDropElements = () =>
        <div className={styles['water-drop-elements']}>
            <WaterDrop mode={FRESHWATER_STEPS[currentStepIndex].dropAnimation} />
            {FRESHWATER_STEPS[currentStepIndex].extraElement}
        </div>;

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

    return (
        <div
            className={styles['c-freshwater-scrolly-telling']}
        >
            <MediaContextProvider>
                <Desktop className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-desktop']]: true
                })}
                >
                    <div className={classnames({
                        [styles['water-drop-container']]: true,
                        [styles['-desktop']]: true
                    })}>
                        {getWaterDropElements()}
                    </div>
                    {isBrowser &&
                        <div className={classnames({
                            [styles.steps]: true,
                            [styles['-desktop']]: true
                        })}>
                            {getWaterDropScrollama()}
                        </div>
                    }
                </Desktop>
                <Mobile className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-mobile']]: true
                })}
                >
                    <div className={classnames({
                        [styles['water-drop-container']]: true,
                        [styles['-mobile']]: true
                    })}>
                        {getWaterDropElements()}
                    </div>
                    {isBrowser &&
                        <div className={classnames({
                            [styles.steps]: true,
                            [styles['-mobile']]: true
                        })}>
                            {getWaterDropScrollama()}
                        </div>
                    }
                </Mobile>
                <div
                    className={classnames({
                        [styles.story]: true,
                        [styles['worldmap-story']]: true
                    })}
                >
                    <div className={styles['worldmap-container']}>
                        <img className={styles['worldmap-image']} src="/static/images/scrolly-telling/freshwater/worldmap.svg" />
                        <div className={styles.locations}>
                            {FRESHWATER_WATER_DROP_LOCATIONS.map(location => {
                                const isCurrentItem = location.index === currentStepIndexWorldMap;
                                return (<div
                                    className={classnames({
                                        [styles['water-drop-location']]: true,
                                        "pulsating-circle": isCurrentItem
                                    })}
                                    style={{
                                        top: isCurrentItem ? `${location.top + 3.25}%` : `${location.top}%`,
                                        left: isCurrentItem ? `${location.left + 0.85}%` : `${location.left}%`
                                    }}
                                    key={`worldmap-location-${location.index}`}
                                >
                                    <img src={`/static/images/scrolly-telling/freshwater/drop-map-marker${isCurrentItem ? '-active' : ''}.svg`} />
                                </div>);
                            })}
                        </div>
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