import { Customer } from "./customer.model";

export interface ICustomerRepository {
  createCustomer(email: string, name: string, password: string): Promise<Customer>;
  
  getCustomerByEmail(email: string): Promise<Customer>;
}