import { Injectable } from "@nestjs/common";
import { PainterEntity } from "../entity/painter.entity";
import { Art } from "../repository/art.model";

@Injectable()
export class PainterService {
  constructor(private painterEntity: PainterEntity) {}

  async purche(art: Art) {
    this.painterEntity.updateBalance(art);

  }
}