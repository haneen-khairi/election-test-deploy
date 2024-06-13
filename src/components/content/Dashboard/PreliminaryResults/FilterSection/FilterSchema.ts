import * as yup from "yup";
export const FilterSchema = yup.object().shape({
  voting_center: yup.string(),
  box_id: yup.string(),
});
