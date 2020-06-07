//--------------------------------------------------------
//para importar os arquivios de rota do react
// comando: npm install react-router-dom
// Logo apos colocar ele como dependencia de dev e tipar 
// Comando npm install @types/react-router-dom -D
import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react'; // Importa o react
//--------------------------------------------------------
// Importa as paginas
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

//--------------------------------------------------------

const Routes = () => {
    return (
        // Mapa as rodas do navegador
        <BrowserRouter>
            {/* Primeira rota para a pagina home, qndo é acessado sem passar uma /metodo */}
            <Route component={Home} path="/" exact/>
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    )
}
export default Routes;
