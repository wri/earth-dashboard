import Link from "next/link";
import classnames from "classnames";
import PropTypes from "prop-types";

const ListLink = ({ className, link, label, external, ...rest }) => {
  const anchorProps = Object.assign(
    {...rest},
    external && { target: "_blank", rel: "nofollow noreferrer" },
    // Remove some attributes that shouldn't be applied to the anchor element
    { image: null, body: null }
  );
  
  return (
    <li className={classnames(className)}>
      <Link href={link}>
        <a {...anchorProps}>
          {label}
        </a>
      </Link>
    </li>
  );
};

ListLink.propTypes = {
  className: PropTypes.string,
  external: PropTypes.bool
};

ListLink.defaultProps = {
  className: "",
  external: false
};

export default ListLink;
