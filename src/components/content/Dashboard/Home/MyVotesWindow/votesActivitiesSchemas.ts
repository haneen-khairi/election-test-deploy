import * as yup from "yup";

export const votesActivitiesSchemas = yup.object().shape({
  period: yup.string(),
});
