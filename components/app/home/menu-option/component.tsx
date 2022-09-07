/* eslint-disable @next/next/no-img-element */
import styles from "./option.module.scss";
import ContentPanel from "../content-panel/component";

export type MenuOptionProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => any;
  icon?: string;
  className?: string;
};

const MenuOption = ({ icon, title, description, buttonText, onClick, className }: MenuOptionProps) => {
  return (
    <ContentPanel
      canFocus={true}
      icon={icon}
      title={title}
      buttonText={buttonText}
      ctaAction={onClick}
      className={className}
    >
      <p className={styles["c-menu-option__subtitle"]}>{description}</p>
    </ContentPanel>
  );
};

export default MenuOption;
