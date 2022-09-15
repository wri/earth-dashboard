/* eslint-disable @next/next/no-img-element */
import styles from "./option.module.scss";
import ContentPanel from "../content-panel/component";

export type MenuOptionProps = {
  title: string;
  description: string;
  buttonText: string;
  isSelected: boolean;
  onClick?: () => any;
  onClickCta?: () => any;
  icon?: string;
  className?: string;
};

const MenuOption = ({
  icon,
  title,
  description,
  buttonText,
  isSelected,
  onClick,
  onClickCta,
  className
}: MenuOptionProps) => {
  return (
    <ContentPanel
      isSelected={isSelected}
      canFocus={true}
      icon={icon}
      title={title}
      buttonText={buttonText}
      selectAction={onClick}
      ctaAction={onClickCta}
      className={className}
    >
      <p className={styles["c-menu-option__subtitle"]}>{description}</p>
    </ContentPanel>
  );
};

export default MenuOption;
