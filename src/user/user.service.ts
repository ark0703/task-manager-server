import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entities';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOneUser(id): Promise<User> {
    const data = await this.userRepo.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException('User Not Found');
    }
    return data;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findByEmail(email: string) {
    const data = await this.userRepo.findOne({ where: { email: email } });
    if (!data) throw new NotFoundException('User not Found');
    return data;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  async update(userData, id) {
    const user = await this.findOneUser(id);
    Object.assign(user, userData);
    return this.userRepo.save(user);
  }

  async delete(id) {
    return await this.userRepo.remove(await this.findOneUser(id));
  }
}
