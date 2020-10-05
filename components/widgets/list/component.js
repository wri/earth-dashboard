import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

// components
import Spinner from 'components/ui/spinner';

// styles
import styles from './list-widget.module.scss';

function ListWidget(props) {
  const { widget } = props;
  const widgetConfig = widget && widget.widgetConfig;
  const listWidgetConfig = widgetConfig && widgetConfig.listWidgetConfig;
  const { heading, query, numbers, bullets, format } = listWidgetConfig || {};
  const [loading, setLoading] = useState(true);
  const [listData, setListdata] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(query)
      .then(resp => resp.json())
      .then((response) => {
        setListdata(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toastr.error(`There was an error loading the widget ${widget.name} query: ${err}`);
      });
  }, [widget]);

  const ListTag = numbers ? 'ol' : 'ul';

  return (
    <div className={styles['c-list-widget']}>
      <Spinner isLoading={loading} className="-relative -light" />
      <div className={styles['list-heading']}>
        {heading}
      </div>
      <ListTag>
        {listData.map(elem =>
            <li>
                {elem.key}: {elem.value}
            </li>
        )}
      </ListTag>
    </div>
  );
}

ListWidget.propTypes = { widget: PropTypes.object.isRequired };

export default ListWidget;
