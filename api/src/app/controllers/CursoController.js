import Curso from '../models/Curso';

class CursoController {
    async index(req, res) {
      const cursos = await Curso.findAll()
      res.json(cursos);
    }
  
    async read(req, res) {
        try {
          const curso = await Curso.findAll({where: {id: req.params.id}});
          return res.json(curso);
      } catch (err) {
          return console.err("Erro na busca: ", err);
      }
    }
}

  export default new CursoController();
  