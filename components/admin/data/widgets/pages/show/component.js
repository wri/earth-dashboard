import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// components
import Aside from 'components/ui/aside';
import WidgetForm from 'components/admin/data/widgets/form';
import MetadataForm from 'components/widgets/metadata/form';

function WidgetsShow(props) {
  const {
    query: { id, subtab },
    tabs,
    user: { token }
  } = props;
  const currentSubTab = subtab || 'edit';
  const router = useRouter();

  const handleSubmit = (widget) => {
    if (widget) {
      router.reload();
    } else {
      router.push('/admin/data/widgets');
    }
  }

  return (
    <div className="c-widgets-show">
      <StickyContainer>
        <div className="row l-row">
          <div className="columns small-12 medium-3">
            <Sticky>
              {
                ({ style }) => (
                  <div style={style}>
                    <Aside
                      items={tabs}
                      selected={currentSubTab}
                    />
                  </div>
                )
              }
            </Sticky>
          </div>

          <div className="columns small-12 medium-9">
            {(subtab === 'edit') &&
              (<WidgetForm
                id={id}
                authorization={token}
                onSubmit={handleSubmit}
              />)}

            {(subtab === 'metadata') &&
              (<MetadataForm
                application={process.env.APPLICATIONS}
                authorization={token}
                widget={id}
                onSubmit={() => { Router.pushRoute('/admin/data', { tab: 'widgets', id, subtab: 'edit' }); }}
              />)}
          </div>

        </div>
      </StickyContainer>
    </div>
  );
}

WidgetsShow.propTypes = {
  tabs: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default WidgetsShow;
