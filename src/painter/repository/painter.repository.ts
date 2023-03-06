import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PainterEntity } from "../entity/painter.entity";
import { PainterMapper } from "../painter.mapper";
import { IPainterRepository } from "../interface/repository.interface";
import { Painter, PainterDocument } from "./painter.model";


@Injectable()
export class PainterRepository implements IPainterRepository {
  constructor(@InjectModel('Painter') private painterModel: Model<Painter>) {}

  async getMe(id: string): Promise<PainterEntity> {
    let newCustomer;
    
    let exist = await this.painterModel.findOne({ auth_id: id });
    if (!exist) {
      newCustomer = await this.painterModel.create({ auth_id: id })
    } else {
      newCustomer = exist;
    }

    const customer = PainterMapper.RepositoryToEntity(newCustomer, this);
    return customer;
  }
}