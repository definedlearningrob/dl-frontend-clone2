import * as Yup from 'yup';

export const createValidationSchema = (fieldName: string, message: string) =>
  Yup.object().shape({
    [fieldName]: Yup.string().required(message),
  });
