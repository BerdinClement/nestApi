import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Workers } from '../types';

@Injectable()
export class FileManagementService {
  readFileSync(path: string): Workers {
    const json = fs.readFileSync(path, 'utf8');
    const workers: Workers = JSON.parse(json);
    return workers;
  }

  writeFileSync(path: string, workers: Workers) {
    fs.writeFileSync(path, JSON.stringify(workers, null, 2));
    return workers;
  }
}
