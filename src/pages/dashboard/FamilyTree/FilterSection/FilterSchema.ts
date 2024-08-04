import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  first_name: yup.string(),
  second_name: yup.string(),
  third_name: yup.string(),
  last_name: yup.array(yup.string()),
  place_of_residence: yup.array(yup.string()),
  electoral_district: yup.string(),
  gender: yup.string(),
  voting_center: yup.string(),
});
