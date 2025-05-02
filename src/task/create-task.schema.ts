import * as joi from 'joi';

export const createTaskSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().allow('').required(),
  dueDate: joi.date().iso().required(),
  priority: joi.string().uppercase().valid('HIGH', 'MEDIUM', 'LOW').optional(),
  status: joi
    .string()
    .uppercase()
    .valid('DONE', 'IN_PROGRESS', 'TODO')
    .optional(),
  assignedToId: joi.number().integer().required(),
});
