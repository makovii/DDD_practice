import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from 'src/auth/repository/auth.model';
import { Customer } from 'src/customer/repository/customer.model';
import { Painter } from './painter.model';

export type ArtDocument = HydratedDocument<Art>;

@Schema({ timestamps: true })
export class Art {
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Painter'
  })
  painter_id: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Customer'
  })
  customers: string[];

  @Prop()
  price: number;

  @Prop()
  currency: string;

}

export const ArtSchema = SchemaFactory.createForClass(Art);