import { useEffect } from "react";

import * as Router from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStore = (): void => {
  const { search } = Router.useLocation();

  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
