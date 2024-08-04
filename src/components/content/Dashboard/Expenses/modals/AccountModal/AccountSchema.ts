import * as yup from "yup";

export const AccountSchema = yup.object().shape({
  name: yup.string().required("هذا الحقل اجباري"),
});
