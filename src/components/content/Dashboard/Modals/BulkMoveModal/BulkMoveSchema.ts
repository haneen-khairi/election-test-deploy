import * as yup from "yup";
const numberRegex = /^[0-9]+$/;

export const BulkMoveSchema = yup.object().shape({
  percentage: yup.string().required("يجب اختيار الحالة"),
  longitude: yup.number().required("هذا الحقل اجباري"),
  latitude: yup.number().required("هذا الحقل اجباري"),
  mandoub_main: yup.string().required("هذا الحقل اجباري"),
  mobile_number: yup
    .string()
    .required("هذا الحقل اجباري")
    .matches(numberRegex, "رقم الجوال لا يمكن ان يحتوي على احرف")
    .max(10, "رقم الجوال يجب ان يحتوي على 10 ارقام كحد اقصى")
    .min(10, "رقم الجوال يجب ان يحتوي على 10 ارقام كحد ادنى"),
  note: yup.string().required("هذا الحقل اجباري"),
  mandoub_haraka: yup
    .string()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      const percentage = this.parent.percentage;
      if (percentage == 100) {
        return value !== undefined;
      }
      return true;
    }),
});
