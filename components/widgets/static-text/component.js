import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Spinner from 'components/ui/spinner';
import SourceBox from 'components/widgets/source-box';

// styles
import styles from './static-text-widget.module.scss';

function StaticTextWidget({ widget, showSource }) {
    const widgetConfig = widget && widget.widgetConfig;
    const staticTextWidgetConfig = widgetConfig && widgetConfig.staticTextWidgetConfig;
    const { text, parameters, style, className } = staticTextWidgetConfig || {};
    const source = staticTextWidgetConfig?.source;
    const isInsightTitle = className === 'insight-title';

    const [loading, setLoading] = useState(true);
    const [textData, setTextData] = useState(null);

    useEffect(() => {
        if (!isInsightTitle && parameters?.length > 0) {
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
                        className={classnames({
                            [styles.parameter]: true,
                            [currentParam.topic]: true
                        })}
                        style={currentParam.style}
                        key={`param-${textValue}`}
                    >
                        {textValue}
                    </span>);
            } else {
                return (
                    <span key={`param-${currentStr}`} className={styles.text}>
                        {currentStr}
                    </span>
                );
            }
        });

    return (
        <div
            className={styles['c-static-text-widget']}
            {...(style && { style })}
        >
            <Spinner isLoading={loading} className="-relative -light" />
            <div className={classnames({
                [styles['text-container']]: true,
                [styles['-headline']]: className === 'headline',
                [styles['-insight-title']]: className === 'insight-title'
            })}>
                {!isInsightTitle && textElements}
                {isInsightTitle && text}
            </div>
            {showSource && source && <SourceBox source={source} />}
        </div>
    );
}

StaticTextWidget.propTypes = {
    widget: PropTypes.object.isRequired,
    showSource: PropTypes.bool
};

StaticTextWidget.defaultProps = { showSource: false };

export default StaticTextWidget;
