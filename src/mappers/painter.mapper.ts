import { JwtService } from "@nestjs/jwt";
import { PainterDto } from "src/controller/dto/painter.dto";
import { PainterEntity } from "src/domain/entity/painter.entity";
import { PainterDocument } from "src/repository/painter/painter.model";
import { PainterRepository } from "src/repository/painter/painter.repository";

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