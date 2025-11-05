import express from 'express';

// Imports Parte 1
import singletonLoggerRoutes from './parte1-singleton/LoggerRoutes';
import factoryMethodRoutes from './parte1-factory-method/NotificationRoutes';
import { LoggerService } from './parte1-singleton/LoggerService';

// Imports Parte 2
import adapterRoutes from './parte2-adapter/PaymentRoutes';
import decoratorRoutes from './parte2-decorator/ExporterRoutes';
import facadeRoutes from './parte2-facade/FacadeRoutes';

const app = express();
const port = 3000;

const logger = LoggerService.getInstance();
logger.info('Servidor está iniciando...');

app.use(express.json()); // Middleware para ler JSON

app.get('/', (req, res) => {
    logger.info('Alguém acessou a rota /');
    res.send('Servidor Express com TypeScript está rodando!');
});

// --- Rotas Parte 1 ---
app.use('/singleton', singletonLoggerRoutes);
app.use('/factory-method', factoryMethodRoutes);

// --- Rotas Parte 2 ---
app.use('/adapter', adapterRoutes);
app.use('/decorator', decoratorRoutes);
app.use('/facade', facadeRoutes);

app.listen(port, () => {
    logger.info(`Servidor rodando em http://localhost:${port}`);
});