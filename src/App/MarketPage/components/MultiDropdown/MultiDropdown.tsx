import React from "react";

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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dropdownBtnClass: string = classNames(styles.dropdown__button, {
    [styles.dropdown__button_disabled]: disabled,
    [styles.dropdown__button_open]: isOpen,
  });

  return (
    <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
      <button className={dropdownBtnClass} disabled={disabled}>
        Market-<span className={styles.dropdown__currency}>{value}</span>
        <svg
          className={styles.dropdown__buttonIcon}
          width="7"
          height="4"
          fill="#6C757D"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m6.856.541-2.88 3.237c-.273.296-.694.296-.955 0L.14.54C-.131.235.006 0 .427 0h6.145c.433 0 .558.235.285.541Z" />
        </svg>
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
