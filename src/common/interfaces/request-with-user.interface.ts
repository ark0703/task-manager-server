import { Request } from 'express';
import { User } from 'src/user/user.entities';

export interface RequestWithUser extends Request {
  user: User;
}
