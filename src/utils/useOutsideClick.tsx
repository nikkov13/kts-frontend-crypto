import React from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  onClick: () => void
): void => {
  React.useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent): void => {
      if (ref.current && !ref.current.contains(target as Node)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick, ref]);
};
