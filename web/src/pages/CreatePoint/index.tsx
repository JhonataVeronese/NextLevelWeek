//-----------------------------------------------------
// Imports ficam no javascript
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'; // Importa o react
import './styles.css';
import logo from '../../assets/logo.svg'
// Import de link para utlizar no lugar da tag a href usando link to, para que a pagina nao seja toda carregada, (Pq é assim q tem q ser)
import { Link, useHistory } from 'react-router-dom';
// Importa os icones do react pra ter acesso rodar o comando
//npm install react-icons e pra usar so utlizar como tag  <FiLogIn />
import { FiArrowLeft } from 'react-icons/fi/';

// Inserindo mapa gratuito
//* https://leafletjs.com/examples.html
// https://react-leaflet.js.org/
// para instalar 
// npm install leaflet react-leaflet  
// npm install @types/react-leaflet -D
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import axios from 'axios';
//-----------------------------------------------------

//Sempre que for criado um array ou objeto para usestate deve ser informado manualmente o tipo da variavel
//Criado o tipo de dados para o array
interface Item {
    id: number,
    title: string,
    image_url: string
}
interface UfResponse {
    sigla: string,
}
interface CityResponse {
    nome: string,
}

const CreatePoint = () => {
    //Estados de variavies que sao alteradas 
    //--------------------------------------------------------------------
    // Cria a variavel e a funçao de state, para cada alteraçao poder ser executado e atualizado valores somente nesse treche
    //Sempre que for criado um array ou objeto para usestate deve ser informado manualmente o tipo da variavel
    // Utilizando a interface acima de item para isso
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });
    const [selectedItens, setSeletctedItens] = useState<number[]>([]);
    //--------------------------------------------------------------------

    const history = useHistory();

    // Funçao para que seja possivel executar uma api, e armazenar os dados e utiliza-los na pagina 
    useEffect(() => {
        api.get('items').then(response => {
            // Seta os dados da api na variavel items, atravez do useEffects
            setItems(response.data);
        })
    }, []);

    // Funçao para que seja possivel executar uma api, e armazenar os dados e utiliza-los na pagina 
    useEffect(() => {
        // Usando o axios para chamada externa ja q ela é para outra api
        axios.get<UfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => String(uf.sigla))
            setUfs(ufInitials);
        })
    }, []);

    // Funçao para que seja possivel executar uma api, e armazenar os dados e utiliza-los na pagina 
    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<CityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const city = response.data.map(city => city.nome);
            setCities(city);
        })

    }, [selectedUf]);

    // Funçao para que seja possivel executar uma api, e armazenar os dados e utiliza-los na pagina 
    useEffect(() => {
        // navigator é uma variavel global q acessa em qlqr lugar da web
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition([latitude, longitude]);
        });
    }, []);

    // fUNÇAO PARA RECUPERAR O QUE O USUARIO SELECIONO NO CAMPO UF
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {// necessario importar o ChangeEvent e passar o componente q ta sendo usado, no caso o html selected
        const uf = event.target.value; // Assim consegue recuperar o valor do item selecionado no combo
        setSelectedUf(uf);// Seta a uf o use Effects para ser usado na api
    }

    // fUNÇAO PARA RECUPERAR O QUE O USUARIO SELECIONO NO CAMPO UF
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {// necessario importar o ChangeEvent e passar o componente q ta sendo usado, no caso o html selected
        const city = event.target.value; // Assim consegue recuperar o valor do item selecionado no combo
        setSelectedCity(city);// Seta a uf o use Effects para ser usado na api
    }

    // fUNÇAO PARA RECUPERAR O QUE O USUARIO SELECIONO NO CAMPO UF
    function handleMapClick(event: LeafletMouseEvent) {// necessario importar o ChangeEvent e passar o componente q ta sendo usado, no caso o html selected
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        // ...formData copia tudo q ja tem na variavel par nao nao seja sobreescrito pelo useState
        setFormData({
            ...formData, [name]: value
        });
    }

    function handleSelectItem(id: number) {
        // Percore os itens selecionados verificando se o id do parametro ja existe nesse array
        const alreadySelected = selectedItens.findIndex(item => item === id);
        // Se retornar valor positivo entao existe no array ( > -1)
        if (alreadySelected >= 0) {
            // Filtra os itens que sao diferentes do id passado, para "remover" do array
            const fileredItems = selectedItens.filter(itemFiltrado => itemFiltrado !== id);
            setSeletctedItens(fileredItems);// seta novamente no array

        } else {
            setSeletctedItens([...selectedItens, id]);
        }
    }

    // Funçao para mandar os dados para api, foi adicionado o async pois pode fica lento
    async function handleSubmit(event: FormEvent) {
        event.preventDefault(); // Para que a pagina nao siga o padrao e seja recarregada 
        // Recupera todos os dados que ja estao nos status, para que seja enviado para API e fazer assim a persistencia
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItens;

        const data = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        }
        console.log(data);
        // Mandar os dados para api
        await api.post('points', data);
        alert("Ponto de coleta criado");
        // Redireciona o usuario devolta para a home
        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br />ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade:</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp:</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>

                    </div>
                    {/* ---------------------------------------------------------------- */}

                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={selectedPosition} zoom={13} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="uf">Estado (UF):</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" onChange={handleSelectCity} value={selectedCity}>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* ---------------------------------------------------------------- */}
                    <legend>
                        <h2>Itens Coleta</h2>
                        <span>Selecione um ou mais itens de coleta</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            // onClick={() =>handleSelectItem} feito assim para que a funçao nao seja executada, somente qndo o usuario digitar ou alterar algo
                            <li key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItens.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                    {/* ---------------------------------------------------------------- */}
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>
        </div>
    )
};
export default CreatePoint;