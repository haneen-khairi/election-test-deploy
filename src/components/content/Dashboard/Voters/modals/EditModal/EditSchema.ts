import * as yup from "yup";

const numberRegex = /^07\d{8}$/;

export const EditSchema = yup.object().shape({
  status: yup.number().required("يجب اختيار الحالة"),
  longitude: yup.number().optional(),
  latitude: yup.number().optional(),
  mandoub_main: yup.string().required("هذا الحقل اجباري"),
  note: yup.string().optional(),
  mobile_number: yup
    .string()
    .optional()
    .test(
      "conditional-required",
      "رقم الجوال لا يمكن ان يحتوي على احرف ويجب ان يتكون من 10 أرقام و يبدأ ب07",
      function (value) {
        if (!value) return true;
        if (!numberRegex.test(value)) return false;
        if (value.length !== 10) return false;

        return true;
      },
    ),
  mandoub_haraka: yup
    .string()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      if (!value) return false;
      const status = this.parent.status;
      if (status == 100) {
        return value !== undefined;
      }
      return true;
    }),
});
