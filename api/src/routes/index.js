import { Router } from 'express';

/** Controllers */
import AlunosController from '../app/controllers/AlunoController';
import CursosController from '../app/controllers/CursoController';
import Aluno from '../app/models/Aluno';
/**  * */

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/alunos/:id', AlunosController.read);
routes.post('/cadastro', AlunosController.create);
routes.put('/editar/:id', AlunosController.update);
routes.delete('/excluir/:id', AlunosController.delete);
routes.get('/cursos', CursosController.index);
routes.get('/cursos/:id', CursosController.read);


export default routes;
