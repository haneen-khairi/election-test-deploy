import * as yup from "yup";

export const filterSchemas = yup.object().shape({
  first_name: yup.string(),
  second_name: yup.string(),
  third_name: yup.string(),
  last_name: yup.string(),
});
