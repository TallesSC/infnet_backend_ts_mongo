import { UsuariosEntity } from '../../1entidades/usuarios.entity';

export type CriarUsuarioDTO = Omit<UsuariosEntity, '_id' | 'id' >;
export type AtualizarUsuarioDTO = Partial<CriarUsuarioDTO>;
