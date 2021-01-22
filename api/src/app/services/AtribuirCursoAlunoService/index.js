import Aluno from '../../models/Aluno';

class AtribuirCursoAlunoService {
  async execute({ id_aluno, id_curso }) {
      const aluno = await Aluno.findAll({where: {id: req.params.id}});
      return (aluno ==! null) 
  }
}

export default new AtribuirCursoAlunoService();
