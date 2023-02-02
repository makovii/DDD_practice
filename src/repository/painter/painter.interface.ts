import { Painter } from "./painter.model";

export interface IPainterRepository {
  createPainter(email: string, name: string, password: string): Promise<Painter>;
  
  getPainterByEmail(email: string): Promise<Painter>;
}