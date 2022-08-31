import { useState } from "react";

import { ReactComponent as IconArrow } from "@icons/IconArrow.svg";
import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  disabled,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownBtnClass: string = classNames(styles.dropdown__button, {
    [styles.dropdown__button_disabled]: disabled,
    [styles.dropdown__button_open]: isOpen,
  });

  return (
    <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
      <button className={dropdownBtnClass} disabled={disabled}>
        Market-<span className={styles.dropdown__currency}>{value}</span>
        <IconArrow className={styles.dropdown__buttonIcon} />
      </button>
      {!disabled && isOpen && (
        <ul className={styles.dropdown__list}>
          {options.map((option) => {
            return (
              <li
                className={styles.dropdown__item}
                key={option}
                onClick={() => onChange(option)}
              >
                Market-
                <span className={styles.dropdown__currency}>{option}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
