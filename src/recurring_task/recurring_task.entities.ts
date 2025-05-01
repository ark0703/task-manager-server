import { Task } from 'src/task/task.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RecurringTask {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Task)
  @JoinColumn()
  task: Task;

  @Column()
  frequency: string;
}
