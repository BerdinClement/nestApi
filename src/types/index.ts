export type Workers = Worker[];

export interface Worker {
  employee_id: string;
  first_name: string;
  last_name: string;
  nationality: string;
  department_id: number;
  national_id_number: string;
  bank_account_number: string;
  monthly_salary: number;
  job_title: string;
  contract_start_date: string;
  contract_end_date?: string;
}