import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import CreatePoint from '../pages/CreatePoint';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/cadastro" component={CreatePoint}></Route>
  </BrowserRouter>
)

export default Routes;