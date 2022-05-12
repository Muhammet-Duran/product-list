export const filterCategory = (filterName) => {
  // const filterArr = filterName.reduce((result, item) => {
  //   if (result.indexOf(item) < 0) result.push(item);
  //   return result;
  // }, []);
  const filterArr = [...new Set(filterName)];
  return filterArr;
};
