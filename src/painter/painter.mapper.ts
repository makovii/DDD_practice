import { JwtService } from "@nestjs/jwt";
import { PainterDto } from "./controller/dto/painter.dto";
import { PainterEntity } from "./entity/painter.entity";
import { PainterDocument } from "./repository/painter.model";
import { PainterRepository } from "./repository/painter.repository";

export class PainterMapper {
  static RepositoryToEntity(origin: PainterDocument, context: PainterRepository) {
    const newPainter = new PainterEntity(context, new JwtService);

    newPainter.id = origin.id;
    newPainter.name = origin.name;
    newPainter.email = origin.email;
    newPainter.currency = origin.currency;
    newPainter.balance = origin.balance;
    newPainter.password= origin.password;

    return newPainter;
  }

  public static EntityToDto(origin: PainterEntity): PainterDto {
    const dto = new PainterDto();
    dto.name = origin.name;
    dto.email = origin.email;
    dto.balance = origin.balance;
    dto.currency = origin.currency;
    dto.password = origin.password;

    return dto;
  }
}