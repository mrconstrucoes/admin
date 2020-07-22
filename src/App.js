import React from 'react';
import './sass/main.scss';
import Cabecalho from './components/subcomponents/Cabecalho';
import Contatos from './components/Contatos';

function App() {
  return (
    <div>
      <Cabecalho />
      <Contatos />
    </div>
  );
}

export default App;
