import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className, children, ...args }) => {
  const isDisabled: boolean = Boolean(args.disabled);
  const buttonClass = classNames(styles.button, className, {
    button_disabled: isDisabled,
  });

  return (
    <button className={buttonClass} disabled={isDisabled} {...args}>
      {children}
    </button>
  );
};

export default Button;
