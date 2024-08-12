import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  first_name: yup.string(),
  second_name: yup.string(),
  third_name: yup.string(),
  last_name: yup.string(),
  place_of_residence: yup.string(),
  electoral_district: yup.string(),
  gender: yup.string(),
});
