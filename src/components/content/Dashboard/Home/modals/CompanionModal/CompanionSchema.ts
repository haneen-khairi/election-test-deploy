import * as yup from "yup";
const numberRegex = /^[0-9]+$/;
export const CompanionSchema = yup.object().shape({
  status: yup.number().required("يجب اختيار الحالة"),
  longitude: yup.number().required("هذا الحقل اجباري"),
  latitude: yup.number().required("هذا الحقل اجباري"),
  mandoub_main: yup.number().required("هذا الحقل اجباري"),
  mobile_number: yup
    .string()
    .required("هذا الحقل اجباري")
    .matches(numberRegex, "رقم الجوال لا يمكن ان يحتوي على احرف")
    .max(10, "رقم الجوال يجب ان يحتوي على 10 ارقام كحد اقصى")
    .min(10, "رقم الجوال يجب ان يحتوي على 10 ارقام كحد ادنى"),
  note: yup.string().required("هذا الحقل اجباري"),
  election_time: yup
    .string()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      const status = this.parent.status;
      if (status == 100) {
        return value != "";
      }
      return true;
    }),
  mandoub_haraka: yup
    .number()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      const status = this.parent.status;
      if (status == 100) {
        return value !== undefined;
      }
      return true;
    }),
});
