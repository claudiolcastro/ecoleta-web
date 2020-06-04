import React from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import './assets/css/main.css';

const App: React.FC = () => (
  <div className="App">
    <Header title="E-coleta" />

    <Home />
  </div>
);

export default App;
