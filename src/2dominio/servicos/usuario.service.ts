import { inject, injectable } from 'inversify';
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../dtos/usuario.dto';
import NotFountException from '../exceptions/not-fount.exception';
import UsuarioRepositorioInterface from '../interfaces/repositorios/usuario-repositorio.interface';
import UsuarioServiceInterface from '../interfaces/servicos/usuario-servico.interface';
import 'reflect-metadata';
import { UsuariosEntity } from '../../1entidades/usuarios.entity';

@injectable()
class UsuarioService implements UsuarioServiceInterface {
  private readonly usuarioRepositorio: UsuarioRepositorioInterface;
  constructor (@inject('UsuarioRepositorio') usuarioRepositorio: UsuarioRepositorioInterface) {
    this.usuarioRepositorio = usuarioRepositorio;
  }

  public async buscarTodos (): Promise<UsuariosEntity[] | null> {
    return this.usuarioRepositorio.buscarTodos();
  }

  public async buscarPorId (id: number): Promise<UsuariosEntity | null> {
    const usuario = await this.usuarioRepositorio.buscarPorId(id);
    if (!usuario) {
      throw new NotFountException('Usuario não encontrado.');
    }
    return usuario;
  }

  public async criar (usuario: CriarUsuarioDTO): Promise<UsuariosEntity> {
    return this.usuarioRepositorio.criar(usuario);
  }

  public async atualizar (id:number, usuario: AtualizarUsuarioDTO): Promise<UsuariosEntity | null> {
    const updateResult = await this.usuarioRepositorio.atualizar(id, usuario);
    if (!updateResult) {
      throw new NotFountException('Usuario não encontrado.');
    }
    return updateResult;
  }

  public async deletar (id:number): Promise<string> {
    const deleteResult = await this.usuarioRepositorio.deletar(id);
    if (!deleteResult) {
      throw new NotFountException('Usuario não encontrado.');
    }
    return 'Usuario deletado com sucesso.';
  }
}

export default UsuarioService;
