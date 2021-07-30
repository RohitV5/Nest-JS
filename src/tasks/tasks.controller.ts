import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './dto/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   // if we have any filters defined, call taskService.getTaskWithFilters
  //   // otherwise, just get all tasks
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }else{
  //     return this.tasksService.getAllTasks();
  //   }

  // }

  
  // @Get('/:id')
  // getTaskById(@Param('id') id:string): Task {
  //     return this.tasksService.getTaskById(id);
  // }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Promise<Task> {
      return this.tasksService.getTaskById(id);
  }


  // @Post()
  // createTask(@Body() createTaskDto:CreateTaskDto): Task{
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id:string):void{
  //   console.log(id)
  //   return this.tasksService.deleteTask(id);
  // }
  @Delete('/:id')
  deleteTask(@Param('id') id:string):Promise<void>{
    console.log(id)
    return this.tasksService.deleteTask(id);
  }

  // @Patch('/:id')
  // updateTaskStatus(
  //   @Param('id') id:string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ):Task{
  //   const {status} = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}

