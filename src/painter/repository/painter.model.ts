import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from 'src/auth/repository/auth.model';

export type PainterDocument = HydratedDocument<Painter>;

@Schema({ timestamps: true })
export class Painter {
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth'
  })
  auth_id: Auth;

  @Prop({ default: 0})
  balance: number;

  @Prop({ default: "dollar"})
  currency: string;

}

export const PainterSchema = SchemaFactory.createForClass(Painter);