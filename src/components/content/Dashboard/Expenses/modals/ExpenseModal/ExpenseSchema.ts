import * as yup from "yup";

export const ExpenseSchema = yup.object().shape({
  from_account: yup.string().required("هذا الحقل اجباري"),
  amount: yup.string().required("هذا الحقل اجباري"),
  type: yup.string().required("هذا الحقل اجباري"),
  date: yup.string().required("هذا الحقل اجباري"),
  time: yup.string().required("هذا الحقل اجباري"),
  notes: yup.string().optional(),
});
