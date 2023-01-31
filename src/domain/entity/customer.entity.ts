import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../../repository/customer/customer.repository"
@Injectable()
export class CustomerEntity {
  constructor(private customerRepository: CustomerRepository) {}

  public createCustomer(email: string, name: string) {
    return this.customerRepository.createCustomer(email, name);
  }
}