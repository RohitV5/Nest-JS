import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "../tasks-status.enum";
import { CreateTaskDto } from "./create-task.dto";
import { GetTaskFilterDto } from "./get-tasks.filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto:GetTaskFilterDto):Promise<Task[]>{
        const {status,search} = filterDto;

        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', {status: status})
        }

        if(search){
            query.andWhere('LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search', {search: `%${search}%`})
        }


        const tasks = await query.getMany();
        return tasks;
    }

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