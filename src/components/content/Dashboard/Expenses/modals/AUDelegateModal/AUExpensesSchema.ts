import * as yup from "yup";

export const AUExpensesSchema = yup.object().shape({
  name: yup.string().required("هذا الحقل اجباري"),
  cost: yup.string().required("هذا الحقل اجباري"),
  amount: yup.string().required("هذا الحقل اجباري"),
  date: yup.string().required("هذا الحقل اجباري"),
  time: yup.string().required("هذا الحقل اجباري"),
});
