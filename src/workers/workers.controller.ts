import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { Workers, Worker } from '../types';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string): Worker {
    try {
      return this.workersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Workers> {
    return this.workersService.findAll();
  }
  @Patch()
  @UseGuards(AdminGuard)
  updateOne(@Body() worker: Worker): Worker {
    try {
      return this.workersService.updateOne(worker);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post()
  @UseGuards(AdminGuard)
  createOne(@Body() worker: Worker): Worker {
    try {
      return this.workersService.createOne(worker);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteOne(@Param('id') id: string): Worker {
    try {
      return this.workersService.deleteOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
