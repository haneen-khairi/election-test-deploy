import * as yup from "yup";
const numberRegex = /^[0-9]+$/;
export const AUDelegateSchema = yup.object().shape({
  mobile_number: yup
    .string()
    .required("هذا الحقل اجباري")
    .matches(numberRegex, "رقم الجوال لا يمكن ان يحتوي على احرف")
    .max(10, "رقم الجوال يجب ان يحتوي على 10 ارقام كحد اقصى")
    .min(10, "رقم الجوال يجب ان يحتوي على 10 ارقام كحد ادنى"),
  name: yup.string().required("هذا الحقل اجباري"),
  group: yup.number().required("هذا الحقل اجباري"),
  password: yup.string().required("هذا الحقل اجباري"),
  school: yup.array(),
  voting_center: yup.string(),
  place_of_residence: yup
    .array()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      const group = this.parent.group;
      if (group === 4 || group === 3) {
        return value && value?.length > 0;
      }
      return true;
    }),
  electoral_boxes: yup
    .array()
    .test("conditional-required", "هذا الحقل اجباري", function (value) {
      const group = this.parent.group;
      if (group === 2) {
        return value && value?.length > 0;
      }
      return true;
    }),
  place_of_residence_is_all: yup.boolean().default(false).optional(),
});
