import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import {Form, Button, Icon} from 'semantic-ui-react';
import api from '../../services/api';
import { Div, InitialText } from './styles';

const valoresIniciais = {
  nome: "",
  email: "",
  cep: "",
  cidade:"",
  estado:""
};

export default function App() {
  
  const [values, setValues] = useState(valoresIniciais); 

  function handlerValues(event) {
    let campo = event.target.getAttribute("name");
    let valor = event.target.value;
    setValues({ ...values, [campo]: valor });
  }
  function retornaDados() {
    async function dados() {
      try {
        const response = await api.post("/cadastro", {
          nome: values.nome,
          email: values.email,
          cep: values.cep,
          cidade: values.cidade,
          estado: values.estado
        });
      } catch {
        alert("Confira a api");
      }
    }

    dados();
  }

  return (
    <Div>
             <InitialText>Cadastrar aluno</InitialText>      
       <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Nome' placeholder='Nome'  name="nome" value={values.nome} onChange={handlerValues}/>
                <Form.Input fluid label='Email' placeholder='Email' name="email" value={values.email} onChange={handlerValues}/>
                <Form.Input fluid label='CEP' placeholder='Ex.: 00000-000' name="cep" type="number"  value={values.cep} onChange={handlerValues}/>
                <Form.Input fluid label='Cidade' placeholder='Cidade' name="cidade"  value={values.cidade} onChange={handlerValues}/>
                <Form.Input fluid label='Estado' placeholder='Ex.: MG' name="estado"  value={values.estado} onChange={handlerValues}/>
            </Form.Group>
            <Button as={Link} color='red' className="ButtonLink" to="../">
              <Icon name='remove' />Cancelar
            </Button>
            <Button as={Link} color='blue' className="ButtonLink" to="../admin">
            <Icon name='home' />Home
            </Button>
            <Button color='green' onClick={() => {
              api.post(retornaDados());
              window.location.reload();
              alert("Cadastrado(a) com sucesso. Clique no botão Home para visualizar a lista de alunos cadastrados.")
            }
              }>
              <Icon name='checkmark' /> Salvar
            </Button>
            
        </Form>
        {/* <h1>Seus Dados</h1>
        <p>Nome: {retornaDados}</p>
        <p>Email: {values.email}</p>
        <p>CEP: {values.cep}</p> */}
      </Div>
  );
}
