import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkersService {
  findAll(): string {
    return 'This action returns all workers';
  }
}
