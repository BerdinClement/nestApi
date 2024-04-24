import { Role } from '../enums/role.enum';
import { Expose } from 'class-transformer';

export type Workers = WorkerEntity[];

export class WorkerEntity {
  employee_id: string;
  first_name: string;
  last_name: string;
  nationality: string;
  department_id: number;
  @Expose({ groups: [Role.Identity] })
  national_id_number: string;
  @Expose({ groups: [Role.Payroll] })
  bank_account_number: string;
  @Expose({ groups: [Role.Payroll] })
  monthly_salary: number;
  job_title: string;
  contract_start_date: string;
  contract_end_date?: string;
  constructor(partial: Partial<WorkerEntity>) {
    Object.assign(this, partial);
  }
}
