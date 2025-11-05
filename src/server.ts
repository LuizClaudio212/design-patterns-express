import express from 'express';
import singletonLoggerRoutes from './parte1-singleton/LoggerRoutes';
import factoryMethodRoutes from './parte1-factory-method/NotificationRoutes'; // <--- IMPORTE
import { LoggerService } from './parte1-singleton/LoggerService';

const app = express();
const port = 3000;

const logger = LoggerService.getInstance();
logger.info('Servidor está iniciando...');

app.use(express.json()); // Middleware para ler JSON (IMPORTANTE para o Factory)

app.get('/', (req, res) => {
    logger.info('Alguém acessou a rota /');
    res.send('Servidor Express com TypeScript está rodando!');
});

// Adiciona as rotas do Exercício 1.1
app.use('/singleton', singletonLoggerRoutes);

// Adiciona as rotas do Exercício 1.2
app.use('/factory-method', factoryMethodRoutes); // <--- USE

app.listen(port, () => {
    logger.info(`Servidor rodando em http://localhost:${port}`);
});