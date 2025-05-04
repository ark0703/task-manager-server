import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entities';
import JoiValidationPipe from './joiValidationPipe';
import { CreateTaskSchema } from './create-task.schema';
import { UpdateTaskSchema } from './update-task.schema';
import { GetTaskSchema } from './get-task.schema';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllTask(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(GetTaskSchema))
  getOneTask(@Param('id') id) {
    return this.taskService.findOneTask(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  createTask(@Body() taskData, @Req() req: RequestWithUser): Promise<Task> {
    const user = req.user;
    return this.taskService.create(taskData, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(UpdateTaskSchema))
  updateTask(@Param('id') id, @Body() updateTaskData) {
    return this.taskService.update(id, updateTaskData);
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe(GetTaskSchema))
  deleteTask(@Param('id') id) {
    return this.taskService.remove(id);
  }
}
