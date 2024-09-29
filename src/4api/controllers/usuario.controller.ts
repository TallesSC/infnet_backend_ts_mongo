import { Router, Request, Response } from 'express';
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { body, param, validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import UsuarioServiceInterface from '../../2dominio/interfaces/servicos/usuario-servico.interface';

@injectable()
class UsuarioController {
  private readonly usuarioService: UsuarioServiceInterface;
  public readonly router: Router = Router();

  constructor (@inject('UsuarioService') usuarioService: UsuarioServiceInterface
  ) {
    this.usuarioService = usuarioService;
    this.routes();
  }

  routes () {
    this.router.get('/', this.buscarTodos.bind(this));
    this.router.get('/:id',
      [
        param('id').isNumeric().withMessage('O id tem que ser um numero')
      ]
      , this.buscarPorId.bind(this));
    this.router.post('/',
      [
        body('nome')
          .exists().withMessage('O campo nome é obrigatório')
          .isString().withMessage('O campo nome tem que ser uma string'),
        body('ativo')
          .exists().withMessage('O campo ativo é obrigatório')
          .isBoolean().withMessage('O campo ativo tem que ser um boolean')
      ],
      this.criar.bind(this));
    this.router.patch('/:id', this.atualizar.bind(this));
    this.router.delete('/:id', this.deletar.bind(this));
  }

  async buscarTodos (req: Request, res: Response) {
    const usarios = await this.usuarioService.buscarTodos();
    res.json(usarios);
  }

  async buscarPorId (req: Request, res: Response) {
    const errosValidacao = validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const id = req.params.id ?? 1;
    const usuario = await this.usuarioService.buscarPorId(+id);
    res.json(usuario);
  }

  async criar (req: Request, res: Response) {
    const errosValidacao = validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const dadosUsuario: CriarUsuarioDTO = req.body;
    const newUser = await this.usuarioService.criar(dadosUsuario);
    res.status(201).json(newUser);
  }

  async atualizar (req: Request, res: Response) {
    const id = req.params.id;
    const dadosNovos: AtualizarUsuarioDTO = req.body;

    const updatedUser = await this.usuarioService.atualizar(+id, dadosNovos);
    res.json(updatedUser);
  }

  async deletar (req: Request, res: Response) {
    const id = req.params.id;
    const resultMessage = await this.usuarioService.deletar(+id);
    res.json(resultMessage);
  }
}

export default UsuarioController;
