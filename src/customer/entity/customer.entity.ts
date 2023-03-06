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

const CustomerRepo = () => Inject('CustomerRepo');

@Injectable()
export class CustomerEntity implements ICustomerEntity {
  constructor(@CustomerRepo() private customerRepository: ICustomerRepository) {}

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
}