import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TaskRepository } from "./task.repository";

import { TasksService } from "./tasks.service";

const mockTaskRepository = ()=>({
    getTasks: jest.fn(),
    findOne: jest.fn()
})

const mockUser = {
    username:'Ariel',
    id:'someid',
    password:'pasword',
    tasks:[]
}


describe('TaskService',()=>{
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide:TaskRepository, useFactory:mockTaskRepository}   
            ],      
               
        }).compile();

        tasksService =  module.get(TasksService);
        tasksRepository = module.get(TaskRepository);
    });

    describe('getTasks',()=>{
        it('calls TaskRepository.getTasks and return the result',async ()=>{
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null,mockUser);
            expect (result).toEqual('someValue');
        
        });
    });

    describe('getTaskById',()=>{
        it('calls TaskRepository.findOne and returns the result', async()=>{
            const mockTask = {
                title: 'Test task',
                description: 'test desc',
                id:'someid',
                status:'DONE'
            }

            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TaskRepository.findOne and handles the error', async()=>{
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId',mockUser)).rejects.toThrow(NotFoundException);

        });
    })
});