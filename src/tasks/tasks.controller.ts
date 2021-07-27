import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks   ();
  }

  
  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
      return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto): Task{
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):void{
    console.log(id)
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id:string,
    @Body('status') status: TaskStatus
  ):Task{
    return this.tasksService.updateTaskStatus(id, status);
  }
}

