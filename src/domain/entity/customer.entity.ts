import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CustomerRepository } from "../../repository/customer/customer.repository"
import { ICustomerEntity } from "../interface/customer.interface";
import * as bcrypt from 'bcryptjs';
import { ENCODING_SALT } from "src/constants";
import { Customer, CustomerDocument } from "src/repository/customer/customer.model";
import * as Response from "src/response";
import { JwtService } from '@nestjs/jwt';
import { ICustomerRepository } from "src/repository/customer/customer.interface";

const CustomerRepo = () => Inject('CustomerRepo');

@Injectable()
export class CustomerEntity implements ICustomerEntity {
  constructor(@CustomerRepo() private customerRepository: ICustomerRepository, private jwtService: JwtService) {}

  private _id: number;
  private _name: string;
  private _email: string;
  private _balance: number;
  private _currency: string;
  private _password: string;

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get name(): string {
    return this._name;
  }
  set name(v: string) {
    this._name = v;
  }
  
  get email(): string {
    return this._email;
  }
  set email(v: string) {
    this._email = v;
  }

  get balance(): number {
    return this._balance;
  }
  set balance(v: number) {
    this._balance = v;
  }

  get currency(): string {
    return this._currency;
  }
  set currency(v: string) {
    this._currency = v;
  }
  
  get password(): string {
    return this._password;
  }
  set password(v: string) {
    this._password = v;
  }

  public async registrationCustomer(email: string, name: string, password: string): Promise<CustomerEntity | HttpException> {
    const sameEmailCustomer: CustomerEntity = await this.customerRepository.getCustomerByEmail(email);
    if (sameEmailCustomer) {
      return new HttpException(Response.SAME_EMAIL, HttpStatus.BAD_REQUEST);
    }
    const hashPassword: string = await bcrypt.hash(password, ENCODING_SALT);

    const customer: CustomerEntity = await this.customerRepository.createCustomer(email, name, hashPassword);
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