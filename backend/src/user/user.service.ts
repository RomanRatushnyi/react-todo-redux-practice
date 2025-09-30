import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { username },
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({
      username,
      password: hashedPassword,
    });
  }

  async seedDefaultUser(): Promise<void> {
    const existingUser = await this.findByUsername('admin');
    if (!existingUser) {
      await this.createUser('admin', 'admin123');
      console.log('Default user created: admin/admin123');
    }
  }
}
