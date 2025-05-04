import * as joi from 'joi';
import { emit } from 'process';

export const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(50).required(),
});
