import * as yup from "yup";

export const IncomeTypeSchema = yup.object().shape({
  name: yup.string().required("هذا الحقل اجباري"),
});
