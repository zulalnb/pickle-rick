import Image from "next/image";
import Link from "next/link";
import styles from "./characterCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircle,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import slugify from "slugify";
import { Status } from "@/types/general";

type Params = {
  id: number;
  name: string;
  species: string;
  status: Status;
  image: string;
  type?: string;
  gender?: string;
  origin?: string;
  dataType: "list" | "detail";
};

function CharacterCard({
  id,
  name,
  species,
  status,
  image,
  type,
  gender,
  origin,
  dataType,
}: Params) {
  return (
    <div
      className={classNames(styles.card, {
        [styles.detail]: dataType === "detail",
      })}
    >
      <div className={styles.image_container}>
        <div className={styles.fav}>
          <FontAwesomeIcon icon={faHeart} color="white" size="xl" />
        </div>
        <Image src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.information}>
          <p className={styles.name}>{name}</p>
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
            />{" "}
            <span className={styles.status}>
              {status} - {species}
            </span>
          </p>
          {dataType === "detail" && <p className={styles.origin}>{origin}</p>}
        </div>
        {dataType === "list" && (
          <Link
            href={`/character/${slugify(name, {
              replacement: "-",
              remove: /[*+~.()'"!:@]/g,
              lower: true,
            })}-${id}`}
            replace
          >
            <FontAwesomeIcon icon={faChevronRight} size="xl" color="black" />
          </Link>
        )}
        {dataType === "detail" && (
          <p className={styles.type}>
            {type || "-"} / {gender}
          </p>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
