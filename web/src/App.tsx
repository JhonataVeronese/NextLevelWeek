import React from 'react';
// import React, { useState } from 'react';
// import Header from './Header';
import './App.css';
// import Home from './pages/Home';// Por padrao se nao passar o arquivo, o react tenta buscar o arquivo de nome index
import Routes from './routes';// Importa o arquivo de rota, q contem as paginas a serem abertos
//----------------------------------------------------
function App() {

  // Aqui no return fica sempre o html
  return (
    <Routes />// Devolve a pagina importada
  );

  // UseState devolve [valor do estado, funçao para atulizar o valor do estado]
  // const [counter, setCounter] = useState(0); 
  // function click() {
  //   setCounter(counter+1);
  // }
  // // Aqui no return fica sempre o html
  // return (
  //   <div>
  //     <Header title={'Contador: ${counter}'} />
  //     <h1>{counter}</h1>
  //     <button type="button" onClick={click}>Aumentar</button>
  //   </div>
  // );
}

export default App;
