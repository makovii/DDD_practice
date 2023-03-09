import { CustomerEntity } from "../entity/customer.entity";

export interface ICustomerRepository {
  getMe(id: string): Promise<CustomerEntity>;

  updateBalance(id: string, currentBalance: number): Promise<void>;
}