import React from "react";

import Loader from "@components/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children }) => {
  return (
    <>
      {children}
      <Loader loading={loading} />
    </>
  );
};

export default WithLoader;
