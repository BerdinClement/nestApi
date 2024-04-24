import { Injectable } from '@nestjs/common';
import { FileManagementService } from '../file-management/file-management.service';
import { WorkerEntity, Workers } from '../types';
import { instanceToPlain } from 'class-transformer';
import { Role } from '../enums/role.enum';

@Injectable()
export class WorkersService {
  constructor(private readonly fileManagement: FileManagementService) {}
  findAll(roles: Role[]): Workers {
    const workers: Workers = this.fileManagement.readFileSync(
      './src/db/workers.json',
    );
    const res = workers.map((worker) => {
      return instanceToPlain(new WorkerEntity(worker), { groups: roles });
    });
    return res as Workers;
  }
  findOne(id: string, roles: Role[]): WorkerEntity {
    const workers = this.findAll(roles);
    const worker = workers.find((worker) => worker.employee_id === id);
    if (!worker) {
      throw new Error(`Worker with id ${id} not found`);
    }
    return worker;
  }
  updateOne(worker: WorkerEntity, roles: Role[]): WorkerEntity {
    const workers = this.findAll(roles);
    const id = worker.employee_id;
    const workerIndex = workers.findIndex(
      (worker) => worker.employee_id === id,
    );
    if (workerIndex === -1) {
      throw new Error(`Worker with id ${id} not found`);
    }
    workers[workerIndex] = worker;
    this.fileManagement.writeFileSync('./src/db/workers.json', workers);
    return worker;
  }
  createOne(worker: WorkerEntity, roles: Role[]): WorkerEntity {
    const workers = this.findAll(roles);
    const id = worker.employee_id;
    const workerIndex = workers.findIndex(
      (worker) => worker.employee_id === id,
    );
    if (workerIndex !== -1) {
      throw new Error(`Worker with id ${id} already exists`);
    }
    workers.push(worker);
    this.fileManagement.writeFileSync('./src/db/workers.json', workers);
    return worker;
  }
  deleteOne(id: string, roles: Role[]): WorkerEntity {
    const workers = this.findAll(roles);
    const workerIndex = workers.findIndex(
      (worker) => worker.employee_id === id,
    );
    if (workerIndex === -1) {
      throw new Error(`Worker with id ${id} not found`);
    }
    const [worker] = workers.splice(workerIndex, 1);
    this.fileManagement.writeFileSync('./src/db/workers.json', workers);
    return worker;
  }
}
