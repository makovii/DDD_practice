import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { ENCODING_SALT } from "src/constants";
import * as Response from "src/response";
import { JwtService } from '@nestjs/jwt';
import { IPainterEntity } from "../interface/painter.interface";
import { PainterRepository } from "src/repository/painter/painter.repository";
import { Painter } from "src/repository/painter/painter.model";

@Injectable()
export class PainterEntity implements IPainterEntity {
  constructor(private painterRepository: PainterRepository, private jwtService: JwtService) {}

  public async registrationPainter(email: string, name: string, password: string): Promise<Painter | HttpException> {
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

    const payload = {
      id: painter._id,
      email: painter.email,
      currency: painter.currency
    };

    return this.jwtService.sign(payload)
  }
}