import * as yup from "yup";

export const TransferSchema = yup.object().shape({
  longitude: yup.number().optional(),
  latitude: yup.number().optional(),
  // mandoub_main: yup.string().required("هذا الحقل اجباري"),
  mandoub_haraka: yup.string().required("هذا الحقل اجباري"),
  notes: yup.string().optional(),
});
