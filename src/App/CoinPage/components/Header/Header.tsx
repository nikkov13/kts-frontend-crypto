import Button from "@components/Button";
import IconBack from "@icons/IconBack.svg";
import IconStar from "@icons/IconStar.svg";
import rootStore from "@store/RootStore";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";

export type HeaderProps = {
  id: string;
  image: string;
  name: string;
  symbol: string;
};

const Header: React.FC<HeaderProps> = ({ id, image, name, symbol }) => {
  const navigate = useNavigate();

  const favouriteCoinsStore = rootStore.favouriteCoins;

  const buttonClass = classnames(styles.header__favButton, {
    [styles.header__favButton_active]: favouriteCoinsStore.hasCoin(id),
  });

  const clickHandler = () => {
    favouriteCoinsStore.hasCoin(id)
      ? favouriteCoinsStore.deleteCoin(id)
      : favouriteCoinsStore.setCoin(id);
  };

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
      <Button className={buttonClass} onClick={clickHandler}>
        <IconStar />
      </Button>
    </div>
  );
};

export default observer(Header);
