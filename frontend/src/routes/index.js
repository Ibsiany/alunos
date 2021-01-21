import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Instrucoes from '../pages/Instrucoes';
import Cadastro from '../pages/Cadastro';
import Editar from '../pages/Editar';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Instrucoes} />
    <Route path="/admin" exact component={Dashboard} />
    <Route path="/cadastro" exact component={Cadastro} />
    <Route path="/editar/:id" exact component={Editar} />

    {/*<Route path="/adicionar" exact component={Adicionar} />*/}
  </Switch>
);

export default Routes;
