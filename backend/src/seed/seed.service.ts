import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    try {
      await this.userService.seedDefaultUser();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error during database seeding:', error);
    }
  }
}
