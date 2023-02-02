import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type PainterDocument = HydratedDocument<Painter>;

@Schema({ timestamps: true })
export class Painter {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;
  
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