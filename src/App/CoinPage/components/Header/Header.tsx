import Button from "@components/Button";
import IconBack from "@icons/IconBack.svg";
import IconStar from "@icons/IconStar.svg";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";

export type HeaderProps = {
  image: string;
  name: string;
  symbol: string;
};

const Header: React.FC<HeaderProps> = ({ image, name, symbol }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Button
        className={styles.header__backButton}
        onClick={() => navigate(-1)}
      >
        <IconBack />
      </Button>
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
