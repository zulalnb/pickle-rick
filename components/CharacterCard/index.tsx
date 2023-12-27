import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import styles from "./characterCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import slugify from "slugify";
import { useAppSelector } from "@/lib/redux/hooks";
import { Status } from "@/types/general";
import RouteButton from "../RouteButton";

type Params = {
  id: number;
  name: string;
  species: string;
  status: Status;
  image: string;
  type?: string;
  gender?: string;
  origin?: string;
  dataType: "list" | "detail" | "favorite";
  loading?: boolean;
  gridSystem?: boolean;
  onToggle?: () => void;
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
  onToggle,
  loading,
  gridSystem = false,
}: Params) {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const favorites = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.some((item) => item.id === id);

  console.log(dataType === "detail" && !gridSystem);
  

  return (
    <div
      className={classNames(styles.card, {
        [styles.detail]: dataType === "detail" && !gridSystem,
      })}
    >
      {!loading && (
        <div className={styles.image_container}>
          <span className={styles.fav} onClick={onToggle}>
            <FontAwesomeIcon
              icon={faHeart}
              className={classNames({
                [styles.favorited]: isFavorite,
                [styles.notFavorited]: !isFavorite,
              })}
              size="xl"
            />
          </span>
          {loadingImage && <Skeleton width="100%" height={300} />}
          <Image
            src={image}
            alt={name}
            className={styles.image}
            placeholder="blur"
            onLoadingComplete={() => setLoadingImage(false)}
          />
        </div>
      )}
      {loading && <Skeleton width="100%" height={400} />}
      <div className={styles.body}>
        <div className={styles.information}>
          <p className={styles.name}>
            {loading ? <Skeleton width="30%" /> : name}
          </p>
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
            {!loading && (
              <span>
                {status} - {species}
              </span>
            )}
            {loading && <Skeleton width="20%" />}
          </p>
          {dataType === "detail" && (
            <p className={styles.origin}>
              {loading ? <Skeleton width="20%" /> : origin}
            </p>
          )}
        </div>
        {!loading && dataType === "list" && (
          <RouteButton
            href={`/character/${slugify(name, {
              replacement: "-",
              remove: /[*+~.()'"!:@]/g,
              lower: true,
            })}-${id}`}
          />
        )}
        {!loading && dataType === "detail" && (
          <p className={styles.type}>
            {type || "-"} / {gender}
          </p>
        )}
        {loading && <Skeleton width="10%" />}
      </div>
    </div>
  );
}

export default CharacterCard;
