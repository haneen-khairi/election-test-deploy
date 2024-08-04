/* eslint-disable @typescript-eslint/no-explicit-any */
const filterSelections = (filter: { [key: string]: any }) => {
  const res: { [key: string]: any } = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value === "إختر واحدا ...") return;
    res[key] = value;
  });

  return res;
};

export default filterSelections;
