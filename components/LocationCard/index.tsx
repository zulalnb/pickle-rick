import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./locationCard.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  type: string;
  dimension: string;
  resident_count: number;
};

const LocationCard = ({ name, type, dimension, resident_count }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.information}>
        <p>Name:</p>
        <p>Type:</p>
        <p>Dimension:</p>
        <p>Resident count:</p>
      </div>
      <div className={styles.data}>
        <p>{name}</p>
        <p>{type}</p>
        <p>{dimension ? dimension : "-"}</p>
        <p>{resident_count}</p>
      </div>
      <div className={styles.nav}>
        <FontAwesomeIcon icon={faChevronRight} size="2xl" />
      </div>
    </div>
  );
};

export default LocationCard;
