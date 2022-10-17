/* eslint-disable @next/next/no-img-element */
import styles from "./carousel-card.module.scss";
import classNames from "classnames";
import CtaButton from "components/ui/cta-button";

export type CarouselCardProps = {
  icon: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const CarouselCard = ({ icon, title, description, isSelected, onClick }: CarouselCardProps) => {
  return (
    <div
      data-role="content"
      className={classNames(styles["c-carousel-card"], isSelected ? styles["c-carousel-card--selected"] : undefined)}
      onClick={onClick}
    >
      <div className={styles["c-carousel-card__header-row"]}>
        <div className={styles["c-carousel-card__icon-container"]}>
          <img className={styles["c-carousel-card__image"]} src={icon} alt="" role="presentation" />
        </div>
        <h3 className={styles["c-carousel-card__title"]}>{title}</h3>
      </div>
      <p className={styles["c-carousel-card__subtitle"]}>{description}</p>
      <CtaButton
        as="button"
        onClick={onClick}
        iconName="arrow-right"
        text="Learn More"
        className={styles["c-carousel-card__cta"]}
      />
    </div>
  );
};

export default CarouselCard;
