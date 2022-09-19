import { useState, useRef } from "react";

import IconArrow from "@icons/IconArrow.svg";
import { useOutsideClick } from "@utils/useOutsideClick";
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
  const wrapperRef = useRef(null);

  const close = (): void => {
    if (isOpen) setIsOpen(false);
  };

  useOutsideClick(wrapperRef, close);

  const dropdownBtnClass: string = classNames(styles.dropdown__button, {
    [styles.dropdown__button_disabled]: disabled,
    [styles.dropdown__button_open]: isOpen,
  });

  return (
    <div
      ref={wrapperRef}
      className={styles.dropdown}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className={dropdownBtnClass} disabled={disabled}>
        <span className={styles.dropdown__buttonText}>
          Market-{value.toUpperCase()}
        </span>
        {!disabled && <IconArrow className={styles.dropdown__buttonIcon} />}
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
                Market-{option.toUpperCase()}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
