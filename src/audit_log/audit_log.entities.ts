import { Task } from 'src/task/task.entities';
import { User } from 'src/user/user.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToOne(() => User)
  performedBy: User;

  @ManyToOne(() => Task, { nullable: true })
  task: Task;

  @CreateDateColumn()
  timestamp: Date;
}
