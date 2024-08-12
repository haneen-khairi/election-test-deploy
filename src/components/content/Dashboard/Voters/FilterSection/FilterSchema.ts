import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  full_name: yup.string().optional(),
  first_name: yup.string().optional(),
  second_name: yup.string().optional(),
  third_name: yup.string().optional(),
  last_name: yup.string().optional(),
  nationality_id: yup.string().optional(),
  electoral_district: yup.string().optional(),
  voting_center: yup.string().optional(),
  box: yup.string().optional(),
  family_tree_id: yup.string().optional(),
  place_of_residence: yup.string().optional(),
  gender: yup.string().optional(),
});
