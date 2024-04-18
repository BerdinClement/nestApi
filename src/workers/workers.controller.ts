import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { WorkersService } from './workers.service';
import { Workers, Worker } from '../types';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}
  @Get(':id')
  findOne(@Param('id') id: string): Worker {
    try {
      return this.workersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get()
  findAll(): Workers {
    return this.workersService.findAll();
  }
  @Patch()
  updateOne(@Body() worker: Worker): Worker {
    try {
      return this.workersService.updateOne(worker);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post()
  createOne(@Body() worker: Worker): Worker {
    try {
      return this.workersService.createOne(worker);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string): Worker {
    try {
      return this.workersService.deleteOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
