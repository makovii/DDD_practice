import { CustomerEntity } from "src/domain/entity/customer.entity";

export interface ICustomerRepository {
  createCustomer(email: string, name: string, password: string): Promise<CustomerEntity>;
  
  getCustomerByEmail(email: string): Promise<CustomerEntity> | null;
}