import React from 'react';

// Cria uma interface para poder tipar os objetos que nao sao de tipos comuns, string, boolean, number e bla bla bla
interface HeaderProps {
    title: String;
    // title?: String; // Propriedades com tipo, que seram usadas como parametros, se tiver o ? entao é obrigatoria
}

// Transforma a function em uma constante de funçao utilizando uma Arrow function, Sendo assim pode ser passado parametros como propriedades para cada lugar q utilizar o componete
const Header: React.FC<HeaderProps> = (propriedades) => {// Diz q a funçao vai utitilizar o parametro React.FC<HeaderProps> Tipando a funçao para esse tipo acima
    return (
        <header>
            <h1>{propriedades.title}</h1>
        </header>
    );
}

// function Header(){
//     return (
//         <header>
//             <h1>EColetaHeader</h1>
//         </header>
//     );
// }
export default Header;