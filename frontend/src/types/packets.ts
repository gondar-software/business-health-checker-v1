export interface Customer {
  id: number;
  user_id: number;
  name: string;
  sector: string;
  industry: string;
  size: string;
  turnover: string;
  logo_url?: string;
}

export interface Assessor {
  id: number;
  name: string;
  role: string;
  email: string;
}

export interface User {
  id: number;
  email: string;
  customer?: Customer;
  assessors: Assessor[];
  user_idx?: number;
};

export interface Info {
  id: number;
  name: string;
  sector: string;
  industry: string;
  size: string;
  turnover: string;
}