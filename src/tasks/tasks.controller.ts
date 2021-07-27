import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks   ();
  }

  @Post()
  createTask(@Body() body, @Body('title') title, @Body('description') description): Task{
    console.log('body', body)
    console.log('desc', description)
    console.log('title', title)
    return this.tasksService.createTask(title,description );



  }
}
