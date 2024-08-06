import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Merchant } from './Merchant.schema';

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered '] })
  email: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  verified?: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' }] })
  merchant?: Merchant;

  @Prop({ required: true, default: false })
  isAdmin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
