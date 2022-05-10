import { getProductList } from "../api/productData";

//Generate link with multiple filter
export const generateLink = (person = [], color = [], brand = []) => {
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
  let personFilter;
  let colorFilter;
  let brandFilter;
  let link;
  let filter;

  if (person.length) {
    personFilter = `${generateFilter(person, "person")}`;

    filter = `${personFilter}`;
  }
  if (color.length) {
    colorFilter = `${generateFilter(color, "color")}`;

    filter = `${colorFilter}`;
  }
  if (brand.length) {
    brandFilter = `${generateFilter(brand, "color")}`;

    filter = `${brandFilter}`;
  }
  // console.log(filter);
  if (person.length && color.length && brand.length) {
    filter = `${personFilter}&${colorFilter}`;
  }
  link = getProductList(filter);

  if (!person.length && !color.length) {
    link = getProductList();
  }
  return link;
};
