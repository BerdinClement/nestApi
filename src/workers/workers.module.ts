import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import { FileManagementModule } from '../file-management/file-management.module';

@Module({
  imports: [FileManagementModule],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
