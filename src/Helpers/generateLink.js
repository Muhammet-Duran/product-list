import { getProductList } from "../api/productData";

//Generate link with multiple filter
export const generateLink = (category = [], color = [], brand = []) => {
  const template = (slug, column) => {
    return `${column}=${slug}`;
  };
  const generateFilter = (array, column) => {
    return array
      .map((item) => {
        return template(item, column);
      })
      .join("&");
  };

  let categoryFilter;
  let colorFilter;
  let brandFilter;
  let link;
  let filter;

  if (category.length) {
    categoryFilter = `${generateFilter(category, "category")}`;
    filter = `${categoryFilter}`;
  }
  if (color.length) {
    colorFilter = `${generateFilter(color, "color")}`;
    filter = `${colorFilter}`;
  }
  if (brand.length) {
    brandFilter = `${generateFilter(brand, "brand")}`;
    filter = `${brandFilter}`;
  }

  if (category.length && color.length) {
    filter = `${categoryFilter}&${colorFilter}`;
  }

  if (category.length && brand.length) {
    filter = `${categoryFilter}&${brandFilter}`;
  }
  if (color.length && brand.length) {
    filter = `${colorFilter}&${brandFilter}`;
  }
  if (category.length && color.length && brand.length) {
    filter = `${categoryFilter}&${colorFilter}&${brandFilter}`;
  }

  link = getProductList(filter);
  if (!category.length && !color.length && !brand.length) {
    link = getProductList();
  }
  return link;
};
