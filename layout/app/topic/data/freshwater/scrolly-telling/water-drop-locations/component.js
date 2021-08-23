import classnames from 'classnames';
import PropTypes from 'prop-types';

// components
import PulsatingItem from 'components/ui/pulsating-item';

// utils
import { MediaContextProvider, Mobile, Desktop } from 'utils/responsive';

// constants
import { FRESHWATER_WATER_DROP_LOCATIONS } from '../constants';

// styles
import styles from './water-drop-locations.module.scss';

function WaterDropLocations({ activeIndex }) {

    const getMap = (mode) =>
        <img className={classnames({
            [styles['worldmap-image']]: true,
            [styles['-desktop']]: mode === 'desktop',
            [styles['-mobile']]: mode === 'mobile'
        })}
            src="/static/images/scrolly-telling/freshwater/worldmap.svg"
        />;
    const getFreshwaterDropLOcations = (mode) =>
        <>
            {FRESHWATER_WATER_DROP_LOCATIONS.map(location => {
                const isCurrentItem = location.index === activeIndex;
                return (
                    <div style={{
                        position: 'absolute',
                        top: location[mode].top,
                        left: location[mode].left
                    }}>
                        <PulsatingItem
                            active={isCurrentItem}
                            useDrop={true}
                            level={2}

                        />
                    </div>
                );
            })}
        </>;

    return (
        <div className={styles['c-water-drop-locations']}>
            <MediaContextProvider>
                <Desktop className={classnames({
                    [styles['main-container']]: true,
                    [styles['-desktop']]: true
                })}>
                    <div className={styles['map-container']}>
                        {getMap('desktop')}
                        {getFreshwaterDropLOcations('desktop')}
                    </div>
                </Desktop>
                <Mobile className={classnames({
                    [styles['main-container']]: true,
                    [styles['-mobile']]: true
                })}>
                    <div className={styles['map-container']}>
                        {getMap('mobile')}
                        {getFreshwaterDropLOcations('mobile')}
                    </div>
                </Mobile>
            </MediaContextProvider>
        </div>
    );
}

WaterDropLocations.propTypes = { index: PropTypes.number.isRequired };

export default WaterDropLocations;