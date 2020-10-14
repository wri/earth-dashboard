import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// components
import WidgetForm from 'components/admin/data/widgets/form';

function WidgetsNew(props) {
  const { user: { token } } = props;
  const router = useRouter();

  const handleSubmit = (widget) => {
    if (widget) {
      router.push({
        pathname: '/admin/data/[tab]/[id]/[subtab]', 
        query: {
          tab: 'widgets',
          subtab: 'edit',
          id: widget.id,
          dataset: widget.dataset
        }
      });
    } else {
      router.push({
        pathname: '/admin/data/[tab]', 
        query: {
          tab: 'widgets'
        }
      });
    }
  }

  return (
    <div className="c-widgets-new">
      <WidgetForm
        authorization={token}
        onSubmit={handleSubmit}
      />
    </div>
  );

}

WidgetsNew.propTypes = { user: PropTypes.object.isRequired };

export default WidgetsNew;
