import Link from "next/link";
import Image from "next/image";
import nullSchoolLogoDesktop from "public/static/images/logo-earth-hq.svg";
import nullSchoolLogoMobile from "public/static/images/logo-earth-hq-mobile.svg";
import { Desktop, Mobile } from "utils/responsive";

type LogoLinkProps = {
  href?: string;
  alt?: string;
};

/** Logo with link interaction. */
const LogoLink = ({ href = "/", alt = "Home page", ...rest }: LogoLinkProps) => {
  return (
    <Link href={href} {...rest}>
      <a>
        <Desktop>
          <Image src={nullSchoolLogoDesktop} alt={alt} />
        </Desktop>
        <Mobile>
          <Image src={nullSchoolLogoMobile} alt={alt} />
        </Mobile>
      </a>
    </Link>
  );
};

export default LogoLink;
