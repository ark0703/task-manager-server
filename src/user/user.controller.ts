import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import JoiValidationPipe from 'src/task/joiValidationPipe';
import { CreateUserSchema } from './create-user.schema';
import { UserService } from './user.service';
import { GetUserSchema } from './get-user.schema';
import { UpdateUserSchema } from './update-user.schema';
import { User } from './user.entities';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UsePipes(new JoiValidationPipe(GetUserSchema))
  getUser(@Param() params) {
    return this.userService.findOneUser(Number(params.id));
  }

  @Post()
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  create(@Body() data): Promise<User> {
    return this.userService.create(data);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateUserSchema))
  updateUser(@Body() userData, @Param() params): Promise<User> {
    return this.userService.update(userData, Number(params.id));
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe(GetUserSchema))
  deleteUser(@Param() params): Promise<User> {
    return this.userService.delete(Number(params.id));
  }
}
