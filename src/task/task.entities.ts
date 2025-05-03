import { User } from 'src/user/user.entities';
import { TaskStatus, TaskPriority } from './create-task.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    enumName: 'task_status_enum',
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    enumName: 'task_priority_enum',
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.createdTasks)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;
}
