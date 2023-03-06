import { Body, Controller, Get, HttpException, Post, UnauthorizedException } from '@nestjs/common';
import { PainterEntity } from '../entity/painter.entity';
import { PainterMapper } from '../painter.mapper';
import { PainterDto } from './dto/painter.dto';

@Controller('painter')
export class PainterController {
  constructor(private painterEntity: PainterEntity) {}

  @Post('/registration')
  async registrationPainter(@Body() input: PainterDto): Promise<PainterDto | HttpException> {
    const entity = await this.painterEntity.registrationPainter(input.email, input.name, input.password);
    if(entity.name === "HttpException") return entity;
    const dto: PainterDto = PainterMapper.EntityToDto(entity as PainterEntity);
    return dto;
  }

  @Get('/login')
  loginPainter(@Body() input: Partial<PainterDto>): Promise<string | UnauthorizedException> {
    return this.painterEntity.loginPainter(input.email, input.password);
  }
}
