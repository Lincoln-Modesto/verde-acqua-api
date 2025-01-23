import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'E-mail único do usuário',
    example: 'johndoe@example.com',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.toString(),
  })
  @Prop({
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'StrongP@ssw0rd!',
    minLength: 8,
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.toString(),
  })
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

  @ApiProperty({
    description: 'ID do condomínio associado ao usuário',
    example: '64b8c7e5f5c76a2d88a12345',
    type: String,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Condo' })
  condo: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
  })
  @Prop()
  phone: string;

  @ApiProperty({
    description: 'Papel do usuário no sistema',
    example: 'admin',
    enum: ['admin', 'manager', 'collaborator'],
  })
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
    ret.id = ret._id;
    delete ret._id;
  },
});
