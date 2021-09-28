import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import nullSchoolLogo from "public/static/images/logo-nullschool.svg";

const LogoLink = ({ href, alt, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      <a>
        <Image src={nullSchoolLogo} alt={alt} />
      </a>
    </Link>
  );
};

LogoLink.propTypes = {
  href: PropTypes.string,
  alt: PropTypes.string
};

LogoLink.defaultProps = {
  href: "/",
  alt: "Home page"
};

export default LogoLink;
