import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// components
import { Table, Button, Popup, Modal, Header, Icon, Form } from 'semantic-ui-react'

//services
import api from '../../services/api';

// styles
import { Container, InitialText } from './styles';
const valoresIniciais = {
  nome: "",
  email: "",
  cep: "",
  cidade:"",
  estado:""
};


const Dashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [modalInfos, setModalInfos] = useState(false);
  const [values, setValues] = useState(valoresIniciais)

  function handlerChange(event) {
    let campo = event.target.getAttribute("name");
    let valor = event.target.value;
    setValues({ ...values, [campo]: valor });
  }
  function retornaDados(id) {
    async function dados() {
      try {
        const response = await api.put(`/editar/${id}`, {
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

  useEffect(()=>{
    async function fetchData() {
      try{
        const response = await api.get('/alunos');
        setAlunos(response.data);
      } catch {
        alert('Confira a api');
      }
    }
    fetchData();
  }, [])
  const render_modal_info_alunos = () => (
    <Modal open={modalInfos} onClose={()=>setModalInfos(false)} closeIcon>
    <Header content={`Editando informações de ${currentInfo.nome}`} />
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Nome' placeholder='Nome' name="nome" value={currentInfo.nome} values={values.nome} onChange={handlerChange}/>
          <Form.Input fluid label='Email' placeholder='Email' name="email" value={currentInfo.email} values={values.email} onChange={handlerChange}/>
          <Form.Input fluid label='CEP' placeholder='Ex.:00000-000' name="cep" type="number" value={currentInfo.cep} values={values.cep} onChange={handlerChange}/>
          <Form.Input fluid label='Cidade' placeholder='Cidade' name="cidade" value={currentInfo.cidade} values={values.cidade} onChange={handlerChange}/>
          <Form.Input fluid label='Estado' placeholder='Ex.:MG' name="estado" value={currentInfo.estado} values={values.estado} onChange={handlerChange}/>
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={()=>setModalInfos(false)} color='red'>
        <Icon name='remove' /> Cancelar
      </Button>
      <Button as={Link} color='green' className="ButtonLink" onClick={() => api.put(retornaDados(currentInfo.id))} to="../">
        <Icon name='checkmark' /> Salvar
      </Button>
    </Modal.Actions>
  </Modal>
  )

  function open_info_alunos(data_aluno){
    setCurrentInfo(data_aluno)
    setModalInfos(true)
  }

  function render_actions(data_aluno){
    return <center>
      <Popup
        trigger={<Button icon='edit' onClick={()=>open_info_alunos(data_aluno)} />}
        content="Editar informações"
        basic
      />
      {/* <Popup
        trigger={<Button as={Link} icon='edit'className="ButtonLink" to="../editar/:id"/>}
        content="Editar informações"
        basic
      /> */}
      <Popup
        trigger={<Button icon='plus' positive />}
        content="Adicionar curso para aluno"
        basic
      />
      <Popup
        // trigger={<Button as={Link} icon='close' className="ButtonLink" negative onClick={()=> api.delete(`/excluir/${data_aluno.id}`)} to="../"/>}
        trigger={<Button icon='close' negative onClick={()=> {
          api.delete(`/excluir/${data_aluno.id}`)
          window.location.reload();
        }}/>}
        content="Excluir aluno" 
        basic
      />
    </center>
  }

  function render_alunos(){
    return alunos.map((v)=><Table.Row>
      {/* <Table.Cell>{v.id}</Table.Cell> */}
      <Table.Cell>{v.nome}</Table.Cell>
      <Table.Cell>{v.email}</Table.Cell>
      <Table.Cell>{v.cep}</Table.Cell>
      <Table.Cell>{render_actions(v)}</Table.Cell>
    </Table.Row>)
  }

  return (
    <Container>
      <InitialText>Administrador de alunos</InitialText>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>ID Aluno</Table.HeaderCell> */}
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>CEP</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { alunos.length > 0 ? render_alunos() : <h2>Nenhum dado registrado </h2> }
        </Table.Body>
      </Table>
      {render_modal_info_alunos()}
      <Button as={Link} className="ButtonLink" to="../cadastro">Adicionar aluno</Button>
      <Button href="/" secondary>Ver instruções</Button>
    </Container>
  );
};

export default Dashboard;


