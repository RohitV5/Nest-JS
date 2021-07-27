import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // if we have any filters defined, call taskService.getTaskWithFilters
    // otherwise, just get all tasks
    if(Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto);
    }else{
      return this.tasksService.getAllTasks();
    }

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

