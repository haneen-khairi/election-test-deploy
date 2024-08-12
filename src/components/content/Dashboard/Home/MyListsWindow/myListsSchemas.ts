import * as yup from "yup";

export const myListsSchema = yup.object().shape({
  names: yup.string(),
});
