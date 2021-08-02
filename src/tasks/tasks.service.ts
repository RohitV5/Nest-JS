import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.filter.dto';
import { TaskRepository } from './dto/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private tasksRepository:TaskRepository){}
    // //we make private so that any other component which injects this service doesnt make changes to 
    // // this property, because that is the job of service not components.


    // getAllTasks() {
    //     return this.tasks;
    // }

    // getTaskById(id:string): Task {
    //     const found = this.tasks.find((task)=> task.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Task with "${id}" not found`);
    //     }

    //     return found;
    // }

    // getAllTasks() {
    //     return this.tasks;
    // }

    getTasks(filterDto: GetTaskFilterDto, user:User):Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto,user)
    }

    async getTaskById(id:string, user:User): Promise<Task>{
        const found = await this.tasksRepository.findOne({where:{id,user}});

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    // this method returns a promise 

    // deleteTask(id:string): void{ 
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task)=> task.id !== found.id)
    // }

    
    async deleteTask(id:string,user:User): Promise<void>{ 

        const result= await this.tasksRepository.delete({id,user})

        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }



    // createTask(createTaskDto:CreateTaskDto) {

    //     const {title, description}  = createTaskDto;
    //     // when key and argument have same value we can use a shorthand. ES6 Feature
    //     const task: Task = { id: uuid(), title, description, status: TaskStatus.OPEN };

    //     this.tasks.push(task);
    //     return task;
    //     // its good to return the updated task because the front end will use this returned value to update the UI instead of hitting extra API.
    // }

    createTask(createTaskDto:CreateTaskDto, user:User): Promise <Task> {
        return this.tasksRepository.createTask(createTaskDto, user)        // its good to return the updated task because the front end will use this returned value to update the UI instead of hitting extra API.
    }

    // updateTaskStatus(id: string, status:TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task
    // }

    async updateTaskStatus(id: string, status:TaskStatus, user:User){
        const task = await this.getTaskById(id, user);


        task.status = status;

        await this.tasksRepository.save(task);

        return task
    }



    // getTasksWithFilters(filterDto: GetTaskFilterDto){
    //    const {status, search} = filterDto;

    //    let tasks = this.getAllTasks();

    //    if(status){
    //     tasks = tasks.filter((task)=> task.status == status)    
    //    }

    //    if(search){
    //     tasks = tasks.filter((task)=>{
    
    //         if( task.title.includes(search) || task.description.includes(search) ){
    //             return true
    //         }

    //     })
    //    }

    //    return tasks;
    // }

}
