import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.filter.dto';

@Injectable()
export class TasksService {
    //we make private so that any other component which injects this service doesnt make changes to 
    // this property, because that is the job of service not components.
    private tasks: Task[] = [];


    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id:string): Task {
        const found = this.tasks.find((task)=> task.id === id);

        if(!found){
            throw new NotFoundException(`Task with "${id}" not found`);
        }

        return found;
    }

    deleteTask(id:string): void{ 
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task)=> task.id !== found.id)
    }



    createTask(createTaskDto:CreateTaskDto) {

        const {title, description}  = createTaskDto;
        // when key and argument have same value we can use a shorthand. ES6 Feature
        const task: Task = { id: uuid(), title, description, status: TaskStatus.OPEN };

        this.tasks.push(task);
        return task;
        // its good to return the updated task because the front end will use this returned value to update the UI instead of hitting extra API.
    }

    updateTaskStatus(id: string, status:TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto){
       const {status, search} = filterDto;

       let tasks = this.getAllTasks();

       if(status){
        tasks = tasks.filter((task)=> task.status == status)    
       }

       if(search){
        tasks = tasks.filter((task)=>{
    
            if( task.title.includes(search) || task.description.includes(search) ){
                return true
            }

        })
       }

       return tasks;
    }

}
