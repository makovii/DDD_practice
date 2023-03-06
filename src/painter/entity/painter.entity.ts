import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { ENCODING_SALT } from "src/constants";
import * as Response from "src/response";
import { JwtService } from '@nestjs/jwt';
import { IPainterEntity } from "../interface/entity.interface";
import { PainterDocument } from "../repository/painter.model";
import { IPainterRepository } from "../interface/repository.interface";
import { Auth } from "src/auth/repository/auth.model";

const PainterRepo = () => Inject('PainterRepo');

@Injectable()
export class PainterEntity implements IPainterEntity {
  constructor(@PainterRepo() private painterRepository: IPainterRepository) {}

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
  
  async getMe(id: string): Promise<PainterEntity> {
    return await this.painterRepository.getMe(id);
  }

}