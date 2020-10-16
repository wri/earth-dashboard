import React from 'react';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';

// Components
import DatasetsForm from 'components/datasets/form';

function DatasetsNew(props) {
  const { user: { token } } = this.props;
  const router = useRouter();
  const handleSubmit = id => router.push({
    pathname: '/admin/data/:tab/:id',
    query: { tab: 'datasets', id }
  });

  return (
    <div className="c-datasets-new">
      <DatasetsForm
        application={[process.env.APPLICATIONS]}
        authorization={token}
        onSubmit={handleSubmit}
        basic={false}
      />
    </div>
  );
}

DatasetsNew.propTypes = { user: PropTypes.object.isRequired };

export default DatasetsNew;

