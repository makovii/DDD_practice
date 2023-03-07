import { Injectable } from "@nestjs/common";
import { PainterEntity } from "../entity/painter.entity";
import { Art } from "../repository/art.model";

@Injectable()
export class PainterService {
  constructor(private painterEntity: PainterEntity) {}

  async purche(art: Art) {
    const painter = await this.painterEntity.getMe(art.painter_id);
    painter.balance += art.price;
    return painter
  }
}