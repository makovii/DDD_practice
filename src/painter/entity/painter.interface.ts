import { HttpException, UnauthorizedException } from "@nestjs/common";
import { Painter } from "../repository/painter.model";

export interface IPainterEntity {
  registrationPainter(name: string, email: string, password: string): Promise<Painter | HttpException>,

  loginPainter(email: string, password: string): Promise<string | UnauthorizedException>,
}