import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Painter, PainterSchema } from './painter.model';
import { PainterRepository } from './painter.repository';


@Module({
  imports: [MongooseModule.forFeature([{ name: Painter.name, schema: PainterSchema }]),],
  providers: [PainterRepository],
  exports: [PainterRepository],
})
export class PainterRepModule {}