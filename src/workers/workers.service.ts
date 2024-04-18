import { Injectable } from '@nestjs/common';
import { FileManagementService } from '../file-management/file-management.service';
import { Worker, Workers } from '../types';

@Injectable()
export class WorkersService {
  constructor(private readonly fileManagement: FileManagementService) {}
  findAll(): Workers {
    return this.fileManagement.readFileSync('./src/db/workers.json');
  }
  findOne(id: string): Worker {
    const workers = this.findAll();
    const worker = workers.find((worker) => worker.employee_id === id);
    if (!worker) {
      throw new Error(`Worker with id ${id} not found`);
    }
    return worker;
  }
  updateOne(worker: Worker): Worker {
    const workers = this.findAll();
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
  createOne(worker: Worker): Worker {
    const workers = this.findAll();
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
  deleteOne(id: string): Worker {
    const workers = this.findAll();
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
