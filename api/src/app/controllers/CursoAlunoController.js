import CursoAluno from '../models/CursoAluno';

class CursoAlunoController {

  async create(req, res) {
    const {id_pessoa, id_curso} = req.body;
    try {
        const cursoAluno = await CursoAluno.create({id_pessoa, id_curso});
        return res.json(cursoAluno);
    } catch (error) {
        return console.error('Erro na criação', err);
    }
}
}

export default new CursoAlunoController();
