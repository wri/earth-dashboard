import Link from "next/link";
import Image from "next/image";
import nullSchoolLogo from "public/static/images/logo-earth-hq.svg";

type LogoLinkProps = {
  href?: string;
  alt?: string;
};

/** Logo with link interaction. */
const LogoLink = ({ href = "/", alt = "Home page", ...rest }: LogoLinkProps) => {
  return (
    <Link href={href} {...rest}>
      <a>
        <Image src={nullSchoolLogo} alt={alt} />
      </a>
    </Link>
  );
};

export default LogoLink;
