import Link from "next/link";
import styles from "./topic-card.module.scss";
import Icon from "components/ui/Icon";

type TopicCardProps = {
  label: string;
  body: string;
  link: string;
};

/** Links to other news topic. */
const TopicCard = ({ label, body, link }: TopicCardProps) => {
  return (
    <Link href={link}>
      <a>
        <div className={styles["c-topic-card"]}>
          <div>
            <h2>{label}</h2>
            <p>{body}</p>
          </div>

          <Icon name="arrow-right" size={25} type="decorative" />
        </div>
      </a>
    </Link>
  );
};

export default TopicCard;
