import Link from "next/link";
import classnames from "classnames";
import PropTypes from "prop-types";

const ListLink = ({ className, link, label, external }) => (
  <li className={classnames(className)}>
    <Link href={link}>
      <a target={external && "_blank"} rel={external && "nofollow noreferrer"}>
        {label}
      </a>
    </Link>
  </li>
);

ListLink.propTypes = {
  className: PropTypes.string,
  external: PropTypes.bool
};

ListLink.defaultProps = {
  className: "",
  external: false
};

export default ListLink;
