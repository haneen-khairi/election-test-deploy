import * as yup from "yup";

export const ExpensesTypeSchema = yup.object().shape({
  name: yup.string().required("هذا الحقل اجباري"),
});
