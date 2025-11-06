import express from 'express';

// Imports Parte 1
import singletonLoggerRoutes from './parte1-singleton/LoggerRoutes';
import factoryMethodRoutes from './parte1-factory-method/NotificationRoutes';
import { LoggerService } from './parte1-singleton/LoggerService';

// Imports Parte 2
import adapterRoutes from './parte2-adapter/PaymentRoutes';
import decoratorRoutes from './parte2-decorator/ExporterRoutes';
import facadeRoutes from './parte2-facade/FacadeRoutes';

// Imports Parte 3
import observerRoutes from './parte3-observer/ObserverRoutes';
import strategyRoutes from './parte3-strategy/StrategyRoutes';
import chainRoutes from './parte3-chain-of-responsibility/ChainRoutes';
import templateMethodRoutes from './parte3-template-method/TemplateMethodRoutes';

// Imports Parte 4
import integratorRoutes from './parte4-integrador/IntegradorRoutes';

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

// --- Rotas Parte 3 ---
app.use('/observer', observerRoutes);
app.use('/strategy', strategyRoutes);
app.use('/chain', chainRoutes);
app.use('/template-method', templateMethodRoutes);

// --- Rotas Parte 4 ---
app.use('/ecommerce', integratorRoutes); // A Rota do Projeto Integrador

app.listen(port, () => {
    logger.info(`Servidor rodando em http://localhost:${port}`);
});