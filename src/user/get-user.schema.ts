import * as joi from 'joi';

export const GetUserSchema = joi.object({
  id: joi.number().required(),
});
