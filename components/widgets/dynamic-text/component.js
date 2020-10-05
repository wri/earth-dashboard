import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

// components
import Spinner from 'components/ui/spinner';

// styles
import styles from './dynamic-text-widget.module.scss';

function DynamicTextWidget(props) {
    const { widget } = props;
    const widgetConfig = widget && widget.widgetConfig;
    const dynamicTextWidgetConfig = widgetConfig && widgetConfig.dynamicTextWidgetConfig;
    const { text, parameters, style } = dynamicTextWidgetConfig || {};
    const [loading, setLoading] = useState(true);
    const [textData, setTextData] = useState(null);

    useEffect(() => {
        setLoading(true);
    
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

                const paramRegexp = /\{\{([^\}]+)\}\}/g;
                const splitArray = text.split(paramRegexp);
                const paramsFound = text.match(paramRegexp)
                    .map(e => e.replace(/\{\{/g, '').replace(/\}\}/g, ''));

                setTextData({
                    splitArray,
                    paramsFound,
                    newValues
                });
            })
            .catch(error => toastr.error(`Error fetching widget queries for ${widget.name}: ${error}`));
      }, [widget]);

    
    const textElements = textData && textData.splitArray
        .map((currentStr) => {
            if (textData.paramsFound.includes(currentStr)) {
                return (
                    <span 
                        className="parameter"
                        style={parameters.find(p => p.key === currentStr).style}
                    >
                        {textData.newValues[currentStr]}
                    </span>);
            } else {
                return <span className="text">{currentStr}</span>;
            }
        });
    
    return (
        <div
            className="c-dynamic-text-widget"
            {...(style && { style })}
        >
            <Spinner isLoading={loading} className="-relative -light" />
            <div className="text-container">
                {textElements}
            </div>
        </div>
    );
}

DynamicTextWidget.propTypes = {
    widget: PropTypes.object.isRequired
};

export default DynamicTextWidget;