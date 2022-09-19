export type CategoryApi = {
  category_id: string;
  name: string;
};

export type CategoriesApi = CategoryApi[];

export type CategoriesModel = {
  names: string[];
  map: Record<string, string>;
};

export const normalizeCategories = (from: CategoriesApi): CategoriesModel => {
  const names: string[] = [];
  const map: Record<string, string> = {};

  from.forEach((item) => {
    names.push(item.name);
    map[item.name] = item.category_id;
  });

  return {
    names,
    map,
  };
};
