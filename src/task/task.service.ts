import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entities';
import { CreateTaskDto, TaskPriority, TaskStatus } from './create-task.dto';

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
      where: { id: Number(taskData.assignedToId) },
    });

    if (!assignedUser) {
      throw new NotFoundException('User Not Found');
    }

    const task = this.taskRepo.create({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status as TaskStatus,
      priority: taskData.priority as TaskPriority,
      dueDate: taskData.dueDate,
      assignedTo: assignedUser,
      createdBy: creator,
    });
    return this.taskRepo.save(task);
  }

  async findAll() {
    return this.taskRepo.find({ relations: ['createdBy', 'assignedTo'] });
  }

  async findOneTask(id: number): Promise<Task | null> {
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
    const task = await this.findOneTask(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return await this.taskRepo.update(+id, taskData);
  }

  async remove(id: number) {
    const task = await this.findOneTask(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    await this.taskRepo.remove(task);
  }
}
