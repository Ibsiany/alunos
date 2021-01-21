import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll()
    res.json(alunos);
  }

  async read(req, res) {
      try {
        const aluno = await Aluno.findAll({where: {id: req.params.id}});
        return res.json(aluno);
    } catch (err) {
        return console.err("Erro na busca: ", err);
    }
  }

  async create(req, res) {
    const {nome, email, cep, cidade, estado} = req.body;
    try {
        const aluno = await Aluno.create({nome, email, cep, cidade, estado});
        return res.json(aluno);
    } catch (error) {
        return console.error('Erro na criação', err);
    }
 }

  async update(req, res) {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    const { nome, email, cep, cidade, estado } = req.body;
    const id = req.params.id;
    try {
        await Aluno.update({nome, email, cep, cidade, estado}, {where: {id: {[Op.eq]: id}}});
        return res.json({msg: `Aluno ${nome} atualizado com sucesso!`});
    } catch (error) {
        return res.json({msg: `Aluno ${nome} não foi atualizado`}, err);            
    }
  }

  async delete(req, res) {
    try {
      await Aluno.destroy({where: {id: req.params.id }});
      return res.json({msg: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
  } catch (err) {
      return console.err("Erro na exclusão: ", err);
  }
  }
}

export default new AlunoController();
