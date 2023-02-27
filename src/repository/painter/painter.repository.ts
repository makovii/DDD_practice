import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PainterEntity } from "src/domain/entity/painter.entity";
import { PainterMapper } from "src/mappers/painter.mapper";
import { IPainterRepository } from "./painter.interface";
import { Painter, PainterDocument } from "./painter.model";


@Injectable()
export class PainterRepository implements IPainterRepository {
  constructor(@InjectModel('Painter') private painterModel: Model<Painter>) {}

  public async createPainter(email: string, name: string, password: string): Promise<PainterEntity> {
    const newPainter =  await this.painterModel.create({ email, name, password });
    const entity = PainterMapper.RepositoryToEntity(newPainter, this);

    return entity;
  }

  public async getPainterByEmail(email: string): Promise<PainterEntity> {
    const newPainter: PainterDocument | null = await this.painterModel.findOne({ email });
    if (newPainter === null) return null;
    const entity = PainterMapper.RepositoryToEntity(newPainter, this);

    return entity;
  }
}