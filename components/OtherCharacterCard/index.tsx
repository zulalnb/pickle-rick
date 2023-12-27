import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import styles from "./otherCharacterCard.module.scss";

type Props = {
  id: number;
  name: string;
  type: string;
  gender: string;
  image: string;
  origin: string;
};

function OtherCharacterCard({ id, name, type, gender, image, origin }: Props) {
  return (
    <Link
      href={`/character/${slugify(name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      })}-${id}`}
      style={{textDecoration: "none"}}
    >
      <div className={styles.card}>
        <div className={styles.img_wrapper}>
          <Image src={image} alt={name} placeholder="blur" />
        </div>
        <div className={styles.information}>
          <p className={styles.name}>{name}</p>
          <p className={styles.origin}>{origin}</p>
          <p className={styles.type}>
            {type || "-"} / {gender}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default OtherCharacterCard;
