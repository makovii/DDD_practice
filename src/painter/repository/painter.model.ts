import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PainterDocument = HydratedDocument<Painter>;

@Schema({ timestamps: true })
export class Painter {
  
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  balance: number;

  @Prop()
  currency: string;

  @Prop()
  password: string;

}

export const PainterSchema = SchemaFactory.createForClass(Painter);