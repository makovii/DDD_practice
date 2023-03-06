import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { ENCODING_SALT } from "src/constants";
import * as Response from "src/response";
import { JwtService } from '@nestjs/jwt';
import { IPainterEntity } from "./painter.interface";
import { PainterRepository } from "../repository/painter.repository";
import { PainterDocument } from "../repository/painter.model";

@Injectable()
export class PainterEntity implements IPainterEntity {
  constructor(private painterRepository: PainterRepository, private jwtService: JwtService) {}

  _id: number
  _name: string;
  _email: string;
  _balance: number;
  _currency: string;
  _password: string;

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
  
  public async registrationPainter(email: string, name: string, password: string): Promise<PainterEntity | HttpException> {
    const sameEmailPainter = await this.painterRepository.getPainterByEmail(email);
    if (sameEmailPainter) {
      return new HttpException(Response.SAME_EMAIL, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(password, ENCODING_SALT);

    const painter = await this.painterRepository.createPainter(email, name, hashPassword);
    delete painter.password;

    return painter;
  }

  public async loginPainter(email: string, password: string): Promise<string | UnauthorizedException> {
    const painter = await this.painterRepository.getPainterByEmail(email);
    if (!painter) {
      return new UnauthorizedException(Response.WRONG_EMAIL_OR_PASS);
    }
    const passwordEqual = await bcrypt.compare(password, painter.password);
    if (!passwordEqual) {
      return new UnauthorizedException(Response.WRONG_EMAIL_OR_PASS);
    }

    const payload: Partial<PainterDocument> = {
      id: painter._id,
      email: painter.email,
      currency: painter.currency
    };

    return this.jwtService.sign(payload)
  }
}