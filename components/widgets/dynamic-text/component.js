import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

// components
import Spinner from 'components/ui/Spinner';

// styles
import './styles.scss';

function DynamicTextWidget(props) {
    const { widget } = props;
    const widgetConfig = widget && widget.widgetConfig;
    const dynamicTextWidgetConfig = widgetConfig && widgetConfig.dynamicTextWidgetConfig;
    const { text, parameters } = dynamicTextWidgetConfig || {};
    const [loading, setLoading] = useState(true);
    const [completeText, setCompleteText] = useState('');

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

                const newCompleteText = Object.keys(newValues).reduce(
                    (acc, currentKey) => acc.replace(`{{${currentKey}}}`, newValues[currentKey]), text);
                
                setCompleteText(newCompleteText);
            })
            .catch(error => toastr.error(`Error fetching widget queries for ${widget.name}: ${error}`));
      }, [widget]);

    
    
    return (
        <div className="c-dynamic-text-widget">
            <Spinner isLoading={loading} className="-relative -light" />
            {completeText}
        </div>
    );
}

DynamicTextWidget.propTypes = {
    widget: PropTypes.object.isRequired
};

export default DynamicTextWidget;
