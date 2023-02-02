import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CustomerRepository } from "../../repository/customer/customer.repository"
import { ICustomerEntity } from "../interface/customer.interface";
import * as bcrypt from 'bcryptjs';
import { ENCODING_SALT } from "src/constants";
import { Customer, CustomerDocument } from "src/repository/customer/customer.model";
import * as Response from "src/response";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerEntity implements ICustomerEntity {
  constructor(private customerRepository: CustomerRepository, private jwtService: JwtService) {}

  public async registrationCustomer(email: string, name: string, password: string): Promise<Customer | HttpException> {
    const sameEmailCustomer = await this.customerRepository.getCustomerByEmail(email);
    if (sameEmailCustomer) {
      return new HttpException(Response.SAME_EMAIL, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(password, ENCODING_SALT);

    const customer = await this.customerRepository.createCustomer(email, name, hashPassword);
    delete customer.password;

    return customer;
  }

  public async loginCustomer(email: string, password: string): Promise<string | UnauthorizedException> {
    const customer = await this.customerRepository.getCustomerByEmail(email);
    if (!customer) {
      return new UnauthorizedException(Response.WRONG_EMAIL_OR_PASS);
    }
    const passwordEqual = await bcrypt.compare(password, customer.password);
    if (!passwordEqual) {
      return new UnauthorizedException(Response.WRONG_EMAIL_OR_PASS);
    }

    const payload: Partial<CustomerDocument> = {
      id: customer._id,
      email: customer.email,
      currency: customer.currency
    };

    return this.jwtService.sign(payload)
  }
}