import { PainterEntity } from "../entity/painter.entity";
import { Painter } from "../repository/painter.model";

export interface IPainterRepository {
  getMe(id: string): Promise<PainterEntity>;
}