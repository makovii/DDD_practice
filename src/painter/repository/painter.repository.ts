import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PainterEntity } from "../entity/painter.entity";
import { PainterMapper } from "../painter.mapper";
import { IPainterRepository } from "../interface/repository.interface";
import { Painter, PainterDocument } from "./painter.model";
import { Art } from "./art.model";


@Injectable()
export class PainterRepository implements IPainterRepository {
  constructor(
    @InjectModel('Painter') private painterModel: Model<Painter>,
    @InjectModel('Art') private artModel: Model<Art>
    ) {}

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

  async createArt(painterId: string, art: Art): Promise<Art> {
    try {
      return await this.artModel.create({ painter_id: painterId, price: art.price, currency: art.currency });

    } catch(e) {
      console.log(e);
    }
  }

  async updateBalance(art: Art): Promise<void> {
    try {
      await this.painterModel.updateOne({auth_id: art.painter_id}, { $inc: { balance: art.price }});
    } catch (e) {
      throw new Error(e);
    }
    
  }
}