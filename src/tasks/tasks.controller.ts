import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './dto/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto,@GetUser() user:User ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username}, Treieving All Task`)
      return this.tasksService.getTasks(filterDto, user);
  }


  @Get('/:id')
  getTaskById(@Param('id') id:string, @GetUser() user:User): Promise<Task> {
      return this.tasksService.getTaskById(id, user);
  }


  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto, @GetUser() user:User): Promise<Task>{
    return this.tasksService.createTask(createTaskDto, user);
  }


  @Delete('/:id')
  deleteTask(@Param('id') id:string, @GetUser() user:User):Promise<void>{
    console.log(id)
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id:string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user:User
  ):Promise<Task>{
    const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}

