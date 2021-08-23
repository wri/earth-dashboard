import PropTypes from 'prop-types';
import Link from 'next/link';

function EditAction(props) {
  const { data: { id }, action: { route, params } } = props;

  return (
    <Link href={{
      pathname: `${route}/${id}`,
      query: params
    }}
    >
      <a className="c-btn">Edit</a>
    </Link>
  );
}


EditAction.propTypes = {
  data: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default EditAction;
