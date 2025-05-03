import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entities';
import JoiValidationPipe from './joiValidationPipe';
import { CreateTaskSchema } from './create-task.schema';
import { UpdateTaskSchema } from './update-task.schema';
import { GetTaskSchema } from './get-task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTask(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @UsePipes(new JoiValidationPipe(GetTaskSchema))
  getOneTask(@Param('id') id) {
    return this.taskService.findOneTask(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  createTask(@Body() taskData, @Req() req: Request): Promise<Task> {
    const user = req.user;
    return this.taskService.create(taskData, user);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateTaskSchema))
  updateTask(@Param('id') id, @Body() updateTaskSchema) {
    return this.taskService.update(id, updateTaskSchema);
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe(GetTaskSchema))
  deleteTask(@Param('id') id) {
    return this.taskService.remove(id);
  }
}
