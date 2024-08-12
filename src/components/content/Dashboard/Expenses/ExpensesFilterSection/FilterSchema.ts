import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  date: yup.string(),
});
