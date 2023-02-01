import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
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

export const CustomerSchema = SchemaFactory.createForClass(Customer);