import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PainterEntity } from './entity/painter.entity';
import { Art, ArtSchema } from './repository/art.model';
import { PainterRepoProvider } from './repository/painter-repo.provider';
import { Painter, PainterSchema } from './repository/painter.model';
import { PainterService } from './service/painter.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Painter.name, schema: PainterSchema }]),
    MongooseModule.forFeature([{ name: Art.name, schema: ArtSchema }]),],
  providers: [PainterRepoProvider, PainterEntity, PainterService],
  exports: [PainterRepoProvider, PainterEntity, PainterService],
})
export class PainterModule {}