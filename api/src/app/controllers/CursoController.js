import Curso from '../models/Curso';

class CursoController {
  async index(req, res) {
    try  {
      const cursos = await Curso.findAll()
      res.json(cursos);
    } catch (err) {
      return console.err("Erro na busca:", err);
    }
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