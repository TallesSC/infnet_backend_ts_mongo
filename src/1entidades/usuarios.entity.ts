export class UsuariosEntity {
  _id?: string;
  id: number;
  nome: string;
  email: string;
  ativo: boolean;

  constructor (
    id: number,
    nome: string,
    ativo: boolean,
    email: string,
    _id?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this.email = email;
    this._id = _id;
  }
}
