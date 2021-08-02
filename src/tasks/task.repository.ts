import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks.filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    private logger = new Logger('TaskRepository',{timestamp:true});

    async getTasks(filterDto:GetTaskFilterDto, user:User):Promise<Task[]>{
        const {status,search} = filterDto;

        const query = this.createQueryBuilder('task');

        query.where({user})

        if(status){
            query.andWhere('task.status = :status', {status: status})
        }

        if(search){
            query.andWhere('(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)', {search: `%${search}%`})
        }

        try{
            const tasks = await query.getMany();
            return tasks;
        }catch(error){
            this.logger.error(`Failed to get task for user ${user.username} . Filters: ${JSON.stringify(filterDto)}`, error.stack)
            throw new InternalServerErrorException();


        }
        

    }

    async createTask(createTaskDto: CreateTaskDto, user:User): Promise<Task> {
        const {title, description}  = createTaskDto;
        // when key and argument have same value we can use a shorthand. ES6 Feature
        const task: Task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user:user
        })

        await this.save(task)


        return task;
    }
    
}