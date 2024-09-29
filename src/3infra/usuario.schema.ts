import mongoose, { Schema } from 'mongoose';
import { UsuariosEntity } from '../1entidades/usuarios.entity';

const UsuarioSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  ativo: { type: Boolean, required: true }
});

export const UserModel = mongoose.model<UsuariosEntity>('User', UsuarioSchema);
