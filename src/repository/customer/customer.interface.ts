import { Customer } from "./customer.model";

export interface ICustomerRepository {
  
  createCustomer(email: string, name: string): Promise<Customer>
  
}