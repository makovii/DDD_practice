import { Body, Controller, Get, Post } from '@nestjs/common';
import { PainterEntity } from 'src/domain/entity/painter.entity';
import { PainterDto } from './dto/painter.dto';

@Controller('painter')
export class PainterController {
  constructor(private painterEntity: PainterEntity) {}

  @Post('/registration')
  registrationPainter(@Body() input: PainterDto) {
    return this.painterEntity.registrationPainter(input.email, input.name, input.password);
  }

  @Get('/login')
  loginPainter(@Body() input: Partial<PainterDto>) {
    return this.painterEntity.loginPainter(input.email, input.password);
  }
}
