import * as joi from 'joi';

export const GetTaskSchema = joi.object({
  id: joi.number().integer().required(),
});
