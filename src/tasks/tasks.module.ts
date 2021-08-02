import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
