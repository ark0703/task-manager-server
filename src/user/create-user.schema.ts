import * as joi from 'joi';

export const CreateUserSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: joi
    .string()
    .min(3)
    .max(50)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  profilePicture: joi.string().optional(),
  department: joi.string().optional(),
  DOB: joi.date().iso().optional(),
  designation: joi.string().optional(),
  role: joi.string().valid('user', 'admin').default('user').optional(),
  phone: joi.string().optional(),
  isActive: joi.boolean().optional(),
});
