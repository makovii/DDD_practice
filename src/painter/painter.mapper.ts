import { JwtService } from "@nestjs/jwt";
import { UserFromJwt } from "src/userFromJwt";
import { PainterDto } from "./controller/dto/painter.dto";
import { PainterEntity } from "./entity/painter.entity";
import { PainterDocument } from "./repository/painter.model";
import { PainterRepository } from "./repository/painter.repository";

export class PainterMapper {
  static RepositoryToEntity(origin: PainterDocument, context: PainterRepository) {
    const newPainter = new PainterEntity(context);

    newPainter.id = origin.id;
    newPainter.auth_id = origin.auth_id;
    newPainter.currency = origin.currency;
    newPainter.balance = origin.balance;

    return newPainter;
  }

  public static EntityToDto(origin: PainterEntity, userJwt: UserFromJwt): PainterDto {
    const dto = new PainterDto();
    dto.auth_id = origin.auth_id;
    dto.balance = origin.balance;
    dto.currency = origin.currency;
    dto.name = userJwt.name;
    dto.email = userJwt.email;

    return dto;
  }
}