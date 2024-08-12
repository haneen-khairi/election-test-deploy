import * as yup from "yup";

const numberRegex = /^07\d{8}$/;

export const BulkEditSchema = yup.object().shape({
  status: yup.number().optional(),
  longitude: yup.number().optional(),
  latitude: yup.number().optional(),
  mandoub_main: yup.string().optional(),
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
  note: yup.string().optional(),
  mandoub_haraka: yup
    .string()
    .optional()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      const status = this.parent.status;
      if (status == 100) {
        return value !== undefined;
      }
      return true;
    }),
});
