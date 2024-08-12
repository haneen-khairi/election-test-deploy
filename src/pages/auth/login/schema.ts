import * as yup from "yup";

const schema = yup
  .object({
    mobile_number: yup
      .string()
      .required("لا يمكن ان يكون فارغ")
      .min(9, "يجب ان لا يقل عن 9 ارقام"),
    password: yup.string().required("لا يمكن ان يكون فارغ"),
  })
  .required();

export default schema;
