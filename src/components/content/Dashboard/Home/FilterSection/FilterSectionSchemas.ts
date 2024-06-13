import * as yup from "yup";

export const filterSectionSchema = yup.object().shape({
  district: yup.string(),
  representative_name: yup.string(),
  companion_name: yup.string(),
  gender: yup.string(),
  first_name: yup.string(),
  second_name: yup.string(),
  third_name: yup.string(),
  last_name: yup.string(),
  place_of_residence: yup.string(),
  electoral_district: yup.string(),
  boxes: yup.string(),
  centers: yup.string(),
});
