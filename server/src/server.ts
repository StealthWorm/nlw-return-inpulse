import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(cors());           // uma forma de fazer controle de seguranca, para que nao permita que front-ends inaqueados acessem as infos do back, se vc nao colocar ele nao deixar ninhuem acessar
app.use(express.json()); // por padrao nao entende o retorno como json, por isso define esse trecho
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
   console.log('HTTP Server Running');
});