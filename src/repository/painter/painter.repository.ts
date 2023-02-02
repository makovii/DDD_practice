import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPainterRepository } from "./painter.interface";
import { Painter } from "./painter.model";


@Injectable()
export class PainterRepository implements IPainterRepository {
  constructor(@InjectModel('Painter') private painterModel: Model<Painter>) {}

  public async createPainter(email: string, name: string, password: string): Promise<Painter> {
    return this.painterModel.create({ email, name, password });
  }

  public async getPainterByEmail(email: string): Promise<Painter> {
    return this.painterModel.findOne({ email });
  }
}