import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import d3 from 'd3';
import { timeFormat, timeParse } from 'd3-time-format';

// components
import Spinner from 'components/ui/spinner';
import SourceBox from 'components/widgets/source-box';

// styles
import styles from './dynamic-text-widget.module.scss';

function DynamicTextWidget({ widget, showSource }) {
    const widgetConfig = widget && widget.widgetConfig;
    const dynamicTextWidgetConfig = widgetConfig && widgetConfig.dynamicTextWidgetConfig;
    const { text, parameters, style, type } = dynamicTextWidgetConfig || {};
    const source = dynamicTextWidgetConfig?.source;

    const [loading, setLoading] = useState(true);
    const [textData, setTextData] = useState(null);

    useEffect(() => {
        if (parameters?.length > 0) {
            setLoading(true);

            const paramRegexp = /\{\{([^\}]+)\}\}/g;
            const splitArray = text.split(paramRegexp);
            const paramsFound = text.match(paramRegexp)
                .map(e => e.replace(/\{\{/g, '').replace(/\}\}/g, ''));

            const promises = parameters.map(param => fetch(param.query).then(resp => resp.json()));

            Promise.all(promises)
                .then((responses) => {
                    setLoading(false);
                    const newValues = {};
                    responses.forEach((response) => {
                        const data = response.data[0];
                        const key = Object.keys(data)[0];
                        const value = data[key];
                        newValues[key] = value;
                    });

                    setTextData({
                        splitArray,
                        paramsFound,
                        newValues
                    });
                })
                .catch(error => toastr.error(`Error fetching widget queries for ${widget.name}: ${error}`));

        }
    }, [widget]);


    const textElements = textData && textData.splitArray
        .map((currentStr) => {
            if (textData.paramsFound.includes(currentStr)) {
                const currentParam = parameters.find(p => p.key === currentStr);
                const { type, format, inputFormat, outputFormat } = currentParam;
                let textValue;

                const val = textData.newValues[currentStr];
                if (type === 'number') {
                    textValue = d3.format(format)(val)
                } else if (type === 'date') {
                    const parsedDate = timeParse(inputFormat)(val);
                    textValue = timeFormat(outputFormat)(parsedDate);
                }

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
            className={styles['c-dynamic-text-widget']}
            {...(style && { style })}
        >
            <Spinner isLoading={loading} className="-relative -light" />
            <div className={styles['text-container']}>
                {textElements}
            </div>
            { showSource && source && <SourceBox source={source} /> }
        </div>
    );
}

DynamicTextWidget.propTypes = {
    widget: PropTypes.object.isRequired,
    showSource: PropTypes.bool
};

DynamicTextWidget.defaultProps = { showSource: false };

export default DynamicTextWidget;
