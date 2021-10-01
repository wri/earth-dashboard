import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./mega-menu-cta.module.scss";
import uuid from "react-uuid";
import classnames from "classnames";
import PropTypes from "prop-types";

import LinkIcon from "public/static/icons/arrow-right.svg";

const MegaMenuCTA = ({ className, image, title, body, link }) => {
  const { current: titleID } = useRef("mega-menu-cta-title-" + uuid());
  const { current: bodyID } = useRef("mega-menu-cta-body-" + uuid());

  return (
    <div className={classnames(className, styles["c-mega-menu-cta"], image && styles["c-mega-menu-cta--withImage"])}>
      {image && (
        <div className={styles["c-mega-menu-cta__image"]}>
          <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
        </div>
      )}

      <div className={styles["c-mega-menu-cta__content"]}>
        <h1 id={titleID} className={styles["c-mega-menu-cta__title"]}>
          {title}
        </h1>
        <div className={styles["c-mega-menu-cta__body"]}>
          {body && (
            <p id={bodyID} className={styles["c-mega-menu-cta__body__p"]}>
              {body}
            </p>
          )}

          <Link href={link}>
            <a className={styles["c-mega-menu-cta__link"]} aria-labelledby={titleID} aria-describedby={bodyID}>
              <Image src={LinkIcon} role="presentation" alt="" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

MegaMenuCTA.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  link: PropTypes.string.isRequired
};

export default MegaMenuCTA;
