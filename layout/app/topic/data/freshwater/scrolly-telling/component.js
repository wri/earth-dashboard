import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { getShowMobileVersion } from 'utils/responsive';

// constants
import {
    FRESHWATER_STEPS,
    FRESHWATER_STEPS_WORLDMAP,
    FRESHWATER_WATER_DROP_LOCATIONS
} from './constants';

// styles
import styles from './freshwater-scrolly-telling.module.scss';

function FreshwaterScrollyTelling(props) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [currentStepIndexWorldMap, setCurrentStepIndexWorldMap] = useState(0);
    const isBrowser = typeof window !== 'undefined';
    const showMobileVersion = getShowMobileVersion();

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

    return (
        <div
            className={styles['c-freshwater-scrolly-telling']}
        >
            <div
                className={classnames({
                    [styles.story]: true,
                    [styles['water-drop-story']]: true,
                    [styles['-mobile']]: showMobileVersion
                })}
            >
                <div className={classnames({
                    [styles['water-drop-container']]: true,
                    [styles['-mobile']]: showMobileVersion
                })}>
                    <div className={styles['water-drop-elements']}>
                        <div className={styles['water-drop-plus-background']}>
                            <div className={styles['water-drop-background']}>
                                <img src="/static/images/scrolly-telling/freshwater/isometric_terrain.svg" />
                            </div>
                            <div className={styles['water-drop']}>
                                {FRESHWATER_STEPS[currentStepIndex].dropImage}
                            </div>
                        </div>
                        {FRESHWATER_STEPS[currentStepIndex].extraElement}
                    </div>
                </div>
                {isBrowser &&
                    <div className={classnames({
                        [styles.steps]: true,
                        [styles['-mobile']]: showMobileVersion
                    })}>
                        <Scrollama
                            onStepEnter={onStepEnter}
                            offset={0.5}
                        >
                            {FRESHWATER_STEPS.map((step, stepIndex) => {
                                return (
                                    <Step data={stepIndex} key={`step-${stepIndex}`}>
                                        <div 
                                            className={classnames({
                                                [styles['text-box-container']]: true,
                                                [styles['-mobile']]: showMobileVersion
                                            })}
                                        >
                                            <TextBox text={step.textPanel.text} />
                                        </div>
                                    </Step>
                                );
                            })
                            }
                        </Scrollama>
                    </div>
                }
            </div>
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
                    <div className={classnames({
                        [styles.steps]: true,
                        [styles['-mobile']]: showMobileVersion
                    })}>
                        <Scrollama
                            onStepEnter={onStepEnterWorldMap}
                            offset={0.8}
                        >
                            {FRESHWATER_STEPS_WORLDMAP.map((step, stepIndex) => {

                                return (
                                    <Step data={stepIndex} key={`step-${stepIndex}`}>
                                        <div 
                                            className={classnames({
                                                [styles['text-box-container']]: true,
                                                [styles['-mobile']]: showMobileVersion
                                            })}
                                        >
                                            <TextBox text={step.textPanel.text} />
                                        </div>
                                    </Step>
                                );
                            })
                            }
                        </Scrollama>
                    </div>
                }
            </div>
        </div>
    );
}

export default FreshwaterScrollyTelling;