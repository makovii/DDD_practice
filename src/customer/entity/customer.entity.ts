import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ICustomerEntity } from "../interface/entity.interface";
import * as bcrypt from 'bcryptjs';
import { ENCODING_SALT } from "src/constants";
import { CustomerDocument } from "../repository/customer.model";
import * as Response from "src/response";
import { JwtService } from '@nestjs/jwt';
import { ICustomerRepository } from "../interface/repository.interface";
import { Auth } from "src/auth/repository/auth.model";
import { UserFromJwt } from "src/userFromJwt";
import { CustomerService } from "../service/customer.service";
import { Art } from "src/painter/repository/art.model";

const CustomerRepo = () => Inject('CustomerRepo');

@Injectable()
export class CustomerEntity implements ICustomerEntity {
  constructor(
    @CustomerRepo() private customerRepository: ICustomerRepository,
    private customerService: CustomerService) {}

  _id: number;
  _auth_id: Auth;
  _balance: number;
  _currency: string;

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get auth_id(): Auth {
    return this._auth_id;
  }
  set auth_id(v: Auth) {
    this._auth_id = v;
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

  async getMe(id: string): Promise<CustomerEntity> {
    return await this.customerRepository.getMe(id);
  }

  async purche(user: UserFromJwt, art: Art) {
    const customer = await this.getMe(user.id);
    if (customer.balance < art.price) return Response.NOT_ENOUGHT_MONEY;

    try {
      await this.customerService.purche(user, art);
      await this.customerRepository.updateBalance(user.id, customer.balance - art.price);
      customer.balance -= art.price;
      return customer;
    } catch (e) {
      throw new Error(e);
    }
  }
}