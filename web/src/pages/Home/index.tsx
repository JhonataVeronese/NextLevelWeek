//-----------------------------------------------------
// Imports ficam no javascript
import React from 'react'; // Importa o react
import './styles.css'; // Importa o arquivo css, coo esta no mesmo diretorio e nao precisa estar atribuido para uma variavel, entao pode ser feito direto
import logo from '../../assets/logo.svg'
// Importa os icones do react pra ter acesso rodar o comando
//npm install react-icons e pra usar so utlizar como tag  <FiLogIn />
import { FiLogIn } from 'react-icons/fi/';
// Import de link para utlizar no lugar da tag a href usando link to, para que a pagina nao seja toda carregada, (Pq é assim q tem q ser)
import { Link } from 'react-router-dom';
//-----------------------------------------------------

const Home = () => {
    return (
        // div#page-home - Comando para gerar a tag page home
        <div id="page-home">
            {/* div.content ja cria a div com um class  */}
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>


                <main>
                    <h1>Seu Marketplace de coleta de residuos.</h1>
                    <p>Ajudamos pessoas a encontrar pontos de coleta de forma eficiente</p>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}
export default Home;