import { User } from 'src/user/user.entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: false })
  email: boolean;

  @Column({ default: true })
  inApp: boolean;

  @Column({ default: false })
  mute: boolean;
}
