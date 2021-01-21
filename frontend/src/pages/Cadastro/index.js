import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Form, Table, Button, Popup, Modal, Header, Icon, Container, FormField} from 'semantic-ui-react';
import api from '../../services/api';
import { Div } from './styles';

function cadastro (){   
  return (
      <Div>
        <Form> 
            <Form.Group widths='equal'>
                <Form.Input fluid label='Nome' placeholder='Nome'/>
                <Form.Input fluid label='Email' placeholder='Email'/>
                <Form.Input fluid label='CEP' placeholder='Ex.: 00000-000' type="number"/>
            </Form.Group>
        </Form>
        <Button as={Link} color='red' className="ButtonLink" to="../admin">
        <Icon name='remove' />Cancelar
        </Button>
        <Button color='green'>
            <Icon name='checkmark' /> Salvar
        </Button>
      </Div>
  );
}

export default cadastro;