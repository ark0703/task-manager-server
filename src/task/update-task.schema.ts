import * as joi from 'joi';

export const UpdateTaskSchema = joi.object({
  title: joi.string().min(3).max(100).optional(),
  description: joi.string().allow('').optional(),
  priority: joi.string().uppercase().valid('HIGH', 'MEDIUM', 'LOW').optional(),
  status: joi
    .string()
    .uppercase()
    .valid('TODO', 'IN_PROGRESS', 'DONE')
    .optional(),
  assignedToId: joi.number().integer().optional(),
  dueDate: joi.date().iso().optional(),
});
