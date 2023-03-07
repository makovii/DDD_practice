import { Injectable } from "@nestjs/common";
import { Art } from "src/painter/repository/art.model";
import { PainterService } from "src/painter/service/painter.service";
import { UserFromJwt } from "src/userFromJwt";
import { ICustomerService } from "../interface/service.onterface";

@Injectable()
export class CustomerService {
  constructor(private painterService: PainterService) {}

  async purche(user: UserFromJwt, art: Art) {
    this.painterService.purche(art);
  }
}