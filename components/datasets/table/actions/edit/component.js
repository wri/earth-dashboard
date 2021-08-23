import PropTypes from "prop-types";
import Link from "next/link";

function EditAction(props) {
  const {
    data: { status, id },
    action: { route }
  } = props;

  return (
    <span>
      {status === "saved" && (
        <Link href={`${route}/${id}`}>
          <a className="c-btn">Edit</a>
        </Link>
      )}
    </span>
  );
}

EditAction.propTypes = {
  data: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default EditAction;
