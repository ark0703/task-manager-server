import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entities';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(taskData: CreateTaskDto, creator: User): Promise<Task> {
    const assignedUser = await this.userRepo.findOne({
      where: { id: taskData.assignedToId },
    });

    if (!assignedUser) {
      throw new NotFoundException('User Not Found');
    }

    const task = this.taskRepo.create({
      ...taskData,
      assignedTo: assignedUser,
      createdBy: creator,
    });
    return this.taskRepo.save(task);
  }

  async findAll() {
    return this.taskRepo.find({ relations: ['createdBy', 'assignedTo'] });
  }

  async findOne(id: number): Promise<Task | null> {
    const task = this.taskRepo.findOne({
      where: { id },
      relations: ['createdBy', 'assignedTo'],
    });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }

  async update(id: number, taskData: Partial<Task>) {
    const task = this.findOne(id);
  }
}
