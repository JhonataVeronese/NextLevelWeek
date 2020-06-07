import express, { request, response } from 'express'; // Importa o express
import routes from './routes'; // Importa o o arquivo routes.ts
import cors from 'cors'; //importa o path do node para caminhos
import path from 'path'; //importa o path do node para caminhos
//------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/upload', express.static(path.resolve(__dirname, '..', 'upload')));


app.get('/teste', (request, response) => {
    response.json([
        '1','2','7'
    ]);
});

app.listen(3333);