import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PainterEntity } from './entity/painter.entity';
import { PainterRepoProvider } from './repository/painter-repo.provider';
import { Painter, PainterSchema } from './repository/painter.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: Painter.name, schema: PainterSchema }]),],
  providers: [PainterRepoProvider, PainterEntity],
  exports: [PainterRepoProvider, PainterEntity],
})
export class PainterModule {}