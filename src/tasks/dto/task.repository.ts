import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "../tasks-status.enum";
import { CreateTaskDto } from "./create-task.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description}  = createTaskDto;
        // when key and argument have same value we can use a shorthand. ES6 Feature
        const task: Task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        })

        await this.save(task)


        return task;
    }
    
}