import { PainterEntity } from "../entity/painter.entity";
import { Art } from "../repository/art.model";
import { Painter } from "../repository/painter.model";

export interface IPainterRepository {
  getMe(id: string): Promise<PainterEntity>;

  createArt(painterId: string, art: Art): Promise<Art>;
  
  updateBalance(art: Art): Promise<void>;
}