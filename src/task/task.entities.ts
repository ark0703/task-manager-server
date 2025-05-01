import { User } from 'src/user/user.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.createdTasks)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;
}
