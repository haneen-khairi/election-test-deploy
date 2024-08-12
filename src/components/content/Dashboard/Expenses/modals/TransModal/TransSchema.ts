import * as yup from "yup";

export const TransSchema = yup.object().shape({
  to_account: yup.string().required("هذا الحقل اجباري"),
  from_account: yup.string().required("هذا الحقل اجباري"),
  amount: yup.string().required("هذا الحقل اجباري"),
});
