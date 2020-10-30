import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import d3 from 'd3';
import { timeFormat, timeParse } from 'd3-time-format';

// components
import Spinner from 'components/ui/spinner';

// styles
import styles from './static-text-widget.module.scss';

function StaticTextWidget(props) {
    const { widget } = props;
    const widgetConfig = widget && widget.widgetConfig;
    const staticTextWidgetConfig = widgetConfig && widgetConfig.staticTextWidgetConfig;
    const { text, parameters, style, type } = staticTextWidgetConfig || {};
    const [loading, setLoading] = useState(true);
    const [textData, setTextData] = useState(null);
    const textIsStatic = type === 'static';

    useEffect(() => {
        if (parameters?.length > 0) {
            setLoading(true);

            const paramRegexp = /\{\{([^\}]+)\}\}/g;
            const splitArray = text.split(paramRegexp);
            const paramsFound = text.match(paramRegexp)
                .map(e => e.replace(/\{\{/g, '').replace(/\}\}/g, ''));

            setTextData({
                splitArray,
                paramsFound
            });

        }
    }, [widget]);


    const textElements = textData && textData.splitArray
        .map((currentStr) => {
            if (textData.paramsFound.includes(currentStr)) {
                const currentParam = parameters.find(p => p.key === currentStr);
                let textValue = currentStr;

                return (
                    <span
                        className={styles.parameter}
                        style={currentParam.style}
                    >
                        {textValue}
                    </span>);
            } else {
                return <span className={styles.text}>{currentStr}</span>;
            }
        });

    return (
        <div
            className={styles['c-static-text-widget']}
            {...(style && { style })}
        >
            <Spinner isLoading={loading} className="-relative -light" />
            <div className={styles['text-container']}>
                {textElements}
            </div>
        </div>
    );
}

StaticTextWidget.propTypes = {
    widget: PropTypes.object.isRequired
};

export default StaticTextWidget;
