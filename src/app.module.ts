import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkersModule } from './workers/workers.module';
import { FileManagementModule } from './file-management/file-management.module';

@Module({
  imports: [WorkersModule, FileManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
