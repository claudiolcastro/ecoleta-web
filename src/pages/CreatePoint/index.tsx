import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import './styles.css';

const CreatePoint: React.FC = () => {
  interface Item {
    id: number;
    title: string;
    image: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');

  useEffect(() => {
    api.get('/items')
      .then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => setUfs(response.data.map(estado => estado.sigla)));
  }, []);

  useEffect(() => {
    if (selectedUf !== '0') {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then((response) => setCidades(response.data.map(cidade => cidade.nome)));
    }
  }, [selectedUf]);

  return(
    <div id="page-create-point">
      <header>
        <img src={Logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

            <div className="field">
              <label htmlFor="name">Nome do ponto</label>
              <input type="text" name="name" id="name"/>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="name">Email</label>
                <input type="email" name="email" id="email" />
              </div>

              <div className="field">
                <label htmlFor="name">Whatsapp</label>
                <input type="text" name="whatsapp" id="whatsapp" />
              </div>
            </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[38.8243562, -9.7177439]} zoom={10}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[38.8243562, -9.7177439]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="name">Estado (UF)</label>
              <select name="uf" id="uf" onChange={(e) => setSelectedUf(e.target.value)}>
                <option value="0">Selecione uma uf</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="name">Cidade</label>
              <select name="city" id="city" onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="0">Selecione uma cidade</option>
                {cidades.map(cidade => (
                  <option key={cidade} value={cidade}>{cidade}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coletas</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li className="selected">
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  )
};

export default CreatePoint;
