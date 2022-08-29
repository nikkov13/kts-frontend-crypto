import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  const loaderClass = classNames(
    styles.loader,
    styles[`loader_size-${size}`],
    className
  );
  return loading ? <div className={loaderClass}></div> : null;
};

export default Loader;
