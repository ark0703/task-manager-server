import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entities';
import JoiValidationPipe from './joiValidationPipe';
import { createTaskSchema } from './create-task.schema';
import { UpdateTaskSchema } from './update-task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTask(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createTaskSchema))
  createTask(@Body() taskData, @Req() req: Request): Promise<Task> {
    const user = req.user;
    return this.taskService.create(taskData, user);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateTaskSchema))
  updateTask(@Param('id') id, @Body() updateTaskSchema) {
    return this.taskService.update(id, updateTaskSchema);
  }
}
