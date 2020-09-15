import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

// components
import Spinner from 'components/ui/Spinner';

// styles
import './styles.scss';

function NewsWidget(props) {
    const { widget } = props;
    const widgetConfig = widget && widget.widgetConfig;
    const newsWidgetConfig = widgetConfig && widgetConfig.newsWidgetConfig;
    const { url, type } = newsWidgetConfig || {};
    const [loading, setLoading] = useState(true);
    const [textData, setTextData] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        
        
      }, [widget]);

    
    
    return (
        <div className="c-news-widget">
            <Spinner isLoading={loading} className="-relative -light" />
            
        </div>
    );
}

NewsWidget.propTypes = {
    widget: PropTypes.object.isRequired
};

export default NewsWidget;
