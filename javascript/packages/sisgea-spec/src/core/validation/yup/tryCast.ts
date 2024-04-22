import type { CastOptions, ISchema } from 'yup';

export const tryParseJSON = (value: any) => {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
  } catch (e) {}

  return value;
};

export const tryCast = (schema: ISchema<any>, value: any, options?: CastOptions) => {
  try {
    return schema.cast(tryParseJSON(value), {
      ...options,
    });
  } catch (e) {}

  return value;
};
