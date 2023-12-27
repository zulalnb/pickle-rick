import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./routeButton.module.scss";

type Props = { href: string | { pathname: string; query?: any } };

export default function RouteButton({ href }: Props) {
  return (
    <Link href={href}>
      <span className={styles.chevron_right}>
        <FontAwesomeIcon icon={faChevronRight} size="2xl" color="black" />
      </span>
    </Link>
  );
}
