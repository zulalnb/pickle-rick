import Image from "next/image";
import styles from "./characterCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircle,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Status } from "@/types/general";

type Params = {
  id: number;
  name: string;
  species: string;
  status: Status;
  image: string;
};

function CharacterCard({ id, name, species, status, image }: Params) {
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <div className={styles.fav}>
          <FontAwesomeIcon icon={faHeart} color="white" size="xl" />
        </div>
        <Image src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.information}>
          <p className={styles.name}>{name}</p>

          <div className={styles.status_wrapper}>
            <p>
              <FontAwesomeIcon
                icon={faCircle}
                color={
                  status === "Alive"
                    ? "green"
                    : status === "Dead"
                    ? "red"
                    : "gray"
                }
              />
              <span className={styles.status}>{status} - {species}</span>
            </p>
          </div>
        </div>
        <FontAwesomeIcon icon={faChevronRight} size="xl" />
      </div>
    </div>
  );
}

export default CharacterCard;
