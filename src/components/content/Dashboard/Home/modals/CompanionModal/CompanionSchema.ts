import * as yup from "yup";

export const SupporterSchema = yup.object().shape({
  name: yup.string().required("هذا الحقل اجباري"),
});
