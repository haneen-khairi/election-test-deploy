import * as yup from "yup";

export const TransferSchema = yup.object().shape({
  notes: yup.number().required("يجب اختيار الحالة"),
  longitude: yup.number().required("هذا الحقل اجباري"),
  latitude: yup.number().required("هذا الحقل اجباري"),
  mandoub_main: yup.string().required("هذا الحقل اجباري"),
  mandoub_haraka: yup.string().required("هذا الحقل اجباري"),
});
