import IconError from "@icons/IconError.svg";
import classnames from "classnames";

import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className }) => {
  const messageClass = classnames(styles.message, className);

  return (
    <div className={messageClass}>
      <IconError className={styles.message__icon} />
      <p className={styles.message__text}>
        Oops!
        <br /> Something went wrong
      </p>
    </div>
  );
};

export default ErrorMessage;
