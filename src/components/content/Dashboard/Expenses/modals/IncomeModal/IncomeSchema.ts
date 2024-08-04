import * as yup from "yup";

export const IncomeSchema = yup.object().shape({
  to_account: yup.string().required("هذا الحقل اجباري"),
  amount: yup.string().required("هذا الحقل اجباري"),
  type: yup.string().required("هذا الحقل اجباري"),
  date: yup.string().required("هذا الحقل اجباري"),
  time: yup.string().required("هذا الحقل اجباري"),
});
