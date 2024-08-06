import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserOTPVerification {
  @Prop({ unique: true, required: true })
  userId?: string;

  @Prop({ required: false })
  otp?: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  expiresAt?: Date;
}

export const UserOTPVerificationSchema =
  SchemaFactory.createForClass(UserOTPVerification);
