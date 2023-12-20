import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./locationCard.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

type Props = {
  name: string;
  type: string;
  dimension: string;
  resident_count: number;
  loading: boolean;
};

const LocationCard = ({
  name,
  type,
  dimension,
  resident_count,
  loading,
}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.information}>
        <p>{loading ? <Skeleton width="50%" /> : "Name:"}</p>
        <p>{loading ? <Skeleton width="50%" /> : "Type:"}</p>
        <p>{loading ? <Skeleton width="50%" /> : "Dimension:"}</p>
        <p>{loading ? <Skeleton width="50%" /> : "Resident count:"}</p>
      </div>
      <div className={styles.data}>
        <p>{loading ? <Skeleton width="70%" /> : name}</p>
        <p>{loading ? <Skeleton width="70%" /> : type}</p>
        <p>{loading ? <Skeleton width="70%" /> : dimension ? dimension : "-"}</p>
        <p>{loading ? <Skeleton width="70%" /> : resident_count}</p>
      </div>
      <div className={styles.nav}>
        {loading ? (
          <Skeleton height="100%" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} size="2xl" />
        )}
      </div>
    </div>
  );
};

export default LocationCard;