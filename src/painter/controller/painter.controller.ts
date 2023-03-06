import { Body, Controller, Get, HttpException, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PainterEntity } from '../entity/painter.entity';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { PainterMapper } from '../painter.mapper';
import { PainterDto } from './dto/painter.dto';

@Controller('painter')
export class PainterController {
  constructor(private painterEntity: PainterEntity) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() userJwt: any) {
    const user = await this.painterEntity.getMe(userJwt.user.id);

    const userDto = PainterMapper.EntityToDto(user, userJwt.user);
    return userDto;
  }
}
