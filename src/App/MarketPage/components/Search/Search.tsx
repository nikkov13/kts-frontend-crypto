import React from "react";

import Input from "@components/Input";
import { useSearchParams } from "react-router-dom";

export type SearchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "placeholder" | "onChange" | "onKeyDown"
>;

const Search: React.FC<SearchProps> = ({ className, ...args }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const target = e.target as HTMLInputElement;

      target.value
        ? searchParams.set("search", target.value)
        : searchParams.delete("search");

      setSearchParams(searchParams);
    }
  };

  return (
    <Input
      className={className}
      type="search"
      value={searchValue}
      placeholder={"Search Cryptocurrency"}
      onChange={setSearchValue}
      onKeyDown={keyDownHandler}
      {...args}
    />
  );
};

export default Search;
