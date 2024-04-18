import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req
} from "@nestjs/common";
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
  async findAll(@Req() request: Request): Promise<Workers> {
    if (!request.headers['authorization']) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    const token = request.headers['authorization'].replace('Bearer ', '');
    const res = await fetch(`http://localhost:9081/introspection/${token}`);
    const data = await res.json();
    if (data.name !== 'Clément Berdin') {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
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
