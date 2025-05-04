import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import JoiValidationPipe from 'src/task/joiValidationPipe';
import { CreateUserSchema } from './create-user.schema';
import { UserService } from './user.service';
import { GetUserSchema } from './get-user.schema';
import { UpdateUserSchema } from './update-user.schema';
import { User } from './user.entities';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './update-user.dto';
import passport from 'passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(GetUserSchema))
  getUser(@Param() params) {
    return this.userService.findOneUser(Number(params.id));
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async create(@Body() data: CreateUserDto): Promise<User> {
    const hashedPass = await this.hashPassword(data.password);
    return this.userService.create({ ...data, password: hashedPass });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(UpdateUserSchema))
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Param() params,
  ): Promise<User> {
    const hashedPass = await this.hashPassword(userData.password);
    return this.userService.update(
      { ...userData, password: hashedPass },
      Number(params.id),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(GetUserSchema))
  deleteUser(@Param() params): Promise<User> {
    return this.userService.delete(Number(params.id));
  }

  private async hashPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
