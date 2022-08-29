import Button from "@components/Button";
import { ReactComponent as IconBack } from "@icons/IconBack.svg";
import { ReactComponent as IconStar } from "@icons/IconStar.svg";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export type HeaderProps = {
  image: string;
  name: string;
  symbol: string;
};

const Header: React.FC<HeaderProps> = ({ image, name, symbol }) => {
  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.header__backButton}>
        <IconBack />
      </Link>
      <img className={styles.header__image} src={image} alt={`${name} logo`} />
      <span className={styles.header__title}>
        {name} <span className={styles.header__subtitle}>({symbol})</span>
      </span>
      <Button className={styles.header__favButton} onClick={() => {}}>
        <IconStar />
      </Button>
    </div>
  );
};

export default Header;
