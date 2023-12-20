import Image from "next/image";
import logo from "../../../public/logo.png";
import styles from "./navigation.module.scss";
import Link from "next/link";

function Navigation() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="logo" width={300} height={100} />
      </Link>
    </div>
  );
}

export default Navigation;
