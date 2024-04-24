import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkerEntity, Workers } from '../types';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/role.guard';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}
  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string, @Req() request: any): WorkerEntity {
    try {
      return this.workersService.findOne(id, request.roles);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  async findAll(@Req() request: any): Promise<Workers> {
    return this.workersService.findAll(request.roles);
  }
  @Patch()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  updateOne(@Body() worker: WorkerEntity, @Req() request: any): WorkerEntity {
    try {
      return this.workersService.updateOne(worker,request.roles);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  createOne(@Body() worker: WorkerEntity, @Req() request: any): WorkerEntity {
    try {
      return this.workersService.createOne(worker, request.roles);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  deleteOne(@Param('id') id: string, @Req() request: any): WorkerEntity {
    try {
      return this.workersService.deleteOne(id, request.roles);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
