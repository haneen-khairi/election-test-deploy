import * as yup from "yup";

export const AUTaskSchema = yup.object().shape({
  mandob: yup.number().required("هذا الحقل اجباري"),
  mandob_type: yup.number().required("هذا الحقل اجباري"),
  type: yup.number().required("هذا الحقل اجباري"),
  time: yup.string().required("هذا الحقل اجباري"),
  description: yup.string().required("هذا الحقل اجباري"),
  date: yup.string().required("هذا الحقل اجباري"),
});
