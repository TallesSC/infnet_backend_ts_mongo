import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import 'reflect-metadata';
import { UsuariosEntity } from '../../1entidades/usuarios.entity';
import { connectToDatabase } from '../database/mongoose.config';
import { UserModel } from '../usuario.schema';
@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {
  constructor () {
    connectToDatabase();
  }

  async buscarTodos (): Promise<(UsuariosEntity[] | null)> {
    return UserModel.find();
  }

  async buscarPorId (id: number): Promise<UsuariosEntity | null> {
    return UserModel.findOne({ id });
  }

  async criar (usuario: CriarUsuarioDTO): Promise<UsuariosEntity> {
    const userWithHighestId = await UserModel.find().sort({ id: -1 }).limit(1);

    const newUserModel = new UserModel(new UsuariosEntity(
      userWithHighestId[0].id + 1,
      usuario.nome,
      usuario.ativo,
      usuario.email
    ));
    return await newUserModel.save();
  }

  async atualizar (id: number, dadosNovos: AtualizarUsuarioDTO): Promise<UsuariosEntity | null> {
    return UserModel.findOneAndUpdate({ id }, dadosNovos, { new: true });
  }

  async deletar (id: number): Promise<boolean> {
    const result = await UserModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
}

export default UsuarioRepositorio;
