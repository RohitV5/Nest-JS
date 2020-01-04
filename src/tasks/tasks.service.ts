import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    //we make private so that any other component which injects this service doesnt make changes to 
    // this property, because that is the job of service not components.
    private tasks = [];


    getAllTasks() {
        return this.tasks;
    }

}
