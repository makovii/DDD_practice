import { CustomerEntity } from "../entity/customer.entity";

export interface ICustomerEntity {
  getMe(id: string): Promise<CustomerEntity>;
}