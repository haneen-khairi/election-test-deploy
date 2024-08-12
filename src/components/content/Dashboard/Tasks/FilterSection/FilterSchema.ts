import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  task_type: yup.string(),
  mandob_type: yup.string(),
  mandob_name: yup.string(),
  status: yup.string(),
  date: yup.string(),
  time: yup.string(),
});
