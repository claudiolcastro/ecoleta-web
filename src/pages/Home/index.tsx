import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import './styles.css';

const Home: React.FC = () => (
  <div id="page-home">
    <div className="content">
      <header>
        <img src={Logo} alt="Ecoleta" />
      </header>

      <main>
        <h1>Seu marketplace de coleta de resíduos</h1>
        <p>Ajudamos pessas a descartar lixo</p>

        <a href="/cadastro">
          <span>
            <FiLogIn />
          </span>
          <span>Cadastre um ponto de coleta</span>
        </a>
      </main>
    </div>
  </div>
);

export default Home;
