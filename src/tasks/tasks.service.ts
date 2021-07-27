import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    //we make private so that any other component which injects this service doesnt make changes to 
    // this property, because that is the job of service not components.
    private tasks: Task[] = [];


    getAllTasks() {
        return this.tasks;
    }

    createTask(createTaskDto:CreateTaskDto) {

        const {title, description}  = createTaskDto;
        // when key and argument have same value we can use a shorthand. ES6 Feature
        const task: Task = { id: uuid(), title, description, status: TaskStatus.OPEN };

        this.tasks.push(task);
        return task;
        // its good to return the updated task because the front end will use this returned value to update the UI instead of hitting extra API.
    }

}
