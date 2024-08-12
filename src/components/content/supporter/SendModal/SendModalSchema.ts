/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

// const numberRegex = /^[0-9]+$/;

export const SendModalSchema = (addedVoters: any[]) => {
  const schema: {
    [key: string]: yup.StringSchema<
      string | undefined,
      yup.AnyObject,
      undefined,
      ""
    >;
  } = {};

  addedVoters.forEach(({ id }: any) => {
    schema[`${id}`] = yup.string().optional();
  });

  return yup.object().shape({
    ...schema,
  });
};
