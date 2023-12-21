import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./filterButton.module.scss";
import classNames from "classnames";

type Props = {
  status: string;
  handleFilter: () => void;
  isActive: boolean;
};

function FilterButton({ status, handleFilter, isActive }: Props) {
  const formattedStatus =
    status[0].toUpperCase() + status.split("").slice(1).join("");
  return (
    <button
      onClick={handleFilter}
      className={classNames(styles.button, { [styles.active]: isActive })}
    >
      <FontAwesomeIcon
        icon={faCircle}
        color={
          status === "alive" ? "green" : status === "dead" ? "red" : "gray"
        }
      />{" "}
      {formattedStatus}
    </button>
  );
}

export default FilterButton;
