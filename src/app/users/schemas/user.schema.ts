import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: (value: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        ),
      message:
        'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Condo' })
  condo: mongoose.Types.ObjectId;

  @Prop()
  phone: string;

  @Prop({
    required: true,
    enum: ['admin', 'manager', 'collaborator'],
  })
  role: 'collaborator' | 'manager' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    // eslint-disable-next-line
    ret.id = ret._id;
    delete ret._id;
  },
});
