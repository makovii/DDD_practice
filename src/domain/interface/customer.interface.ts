import { HttpException, UnauthorizedException } from "@nestjs/common";
import { Customer } from "src/repository/customer/customer.model";

export interface ICustomerEntity {
  registrationCustomer(name: string, email: string, password: string): Promise<Customer | HttpException>,

  loginCustomer(email: string, password: string): Promise<string | UnauthorizedException>,
}