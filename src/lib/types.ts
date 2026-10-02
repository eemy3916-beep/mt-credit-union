export type Role = "user" | "admin";
export type TransactionKind = "transfer" | "deposit" | "withdrawal" | "payment";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: Role;
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
}
export interface Account {
  id: string;
  user_id: string;
  name: string;
  account_type: string;
  masked_number: string;
  available_balance: number;
  current_balance: number;
  pending_balance: number;
  status: "active" | "suspended";
}
export interface Transaction {
  id: string;
  account_id: string;
  user_id: string;
  kind: TransactionKind;
  description: string;
  category: string;
  amount: number;
  status: TransactionStatus;
  reference: string;
  created_at: string;
}
