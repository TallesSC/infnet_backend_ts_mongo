import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../dtos/usuario.dto';
import { UsuariosEntity } from '../../../1entidades/usuarios.entity';

interface UsuarioRepositorioInterface {
  buscarTodos (): Promise<UsuariosEntity[] | null>;
  buscarPorId (id: number): Promise<UsuariosEntity | null>;
  criar (usuario: CriarUsuarioDTO): Promise<UsuariosEntity>;
  atualizar (id:number, dadosNovos: AtualizarUsuarioDTO): Promise<UsuariosEntity | null>;
  deletar (id: number): Promise<boolean>;
}

export default UsuarioRepositorioInterface;
