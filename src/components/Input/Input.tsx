import React from "react";

import IconSearch from "@icons/IconSearch.svg";
import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  type = "text",
  className,
  onChange,
  ...args
}) => {
  const inputClass = classNames(styles.label__input, className, {
    input_disabled: args.disabled,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value);

  return (
    <label className={styles.label}>
      <input
        className={inputClass}
        type={type}
        onChange={changeHandler}
        {...args}
      />
      {type === "search" && (
        <IconSearch className={styles.label__icon} width={16} height={15} />
      )}
    </label>
  );
};

export default Input;
