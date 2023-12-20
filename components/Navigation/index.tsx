import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import styles from "./navigation.module.scss";

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
