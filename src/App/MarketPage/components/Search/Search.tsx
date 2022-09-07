import React from "react";

import Input from "@components/Input";
import { useSearchParams } from "react-router-dom";

export type SearchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "placeholder" | "onChange" | "onKeyDown"
>;

const Search: React.FC<SearchProps> = ({ className, ...args }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("search") || ""
  );

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();

      const target = e.target as HTMLInputElement;

      target.value
        ? searchParams.set("search", target.value)
        : searchParams.delete("search");

      setSearchParams(searchParams);
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const searchParam = searchParams.get("search");

    target.value = searchParam ? searchParam : "";
  };

  return (
    <Input
      className={className}
      type="search"
      value={searchValue}
      placeholder={"Search Cryptocurrency"}
      onChange={setSearchValue}
      onKeyDown={keyDownHandler}
      onBlur={blurHandler}
      {...args}
    />
  );
};

export default Search;
