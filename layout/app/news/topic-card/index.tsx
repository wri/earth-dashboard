import Link from "next/link";
import styles from "./topic-card.module.scss";
import ArrowRight from "public/static/icons/arrow-right.svg";
import Image from "next/image";

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

          <Image src={ArrowRight} role="presentation" alt="" />
        </div>
      </a>
    </Link>
  );
};

export default TopicCard;
