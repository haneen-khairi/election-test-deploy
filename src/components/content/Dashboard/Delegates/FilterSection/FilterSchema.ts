import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  mobile_number: yup.string(),
  name: yup.string(),
  group: yup.string(),
});
