import express, { Request, Response, Router } from 'express';
import { LoggerService } from './LoggerService';

const router = Router();

// Obtém a instância ÚNICA do logger
const logger = LoggerService.getInstance();

// Implementa o endpoint para consultar os logs [cite: 15]
router.get('/logs', (req: Request, res: Response) => {
    res.json(logger.getLogs());
});

// Endpoint de teste para adicionar logs
router.get('/log-teste', (req: Request, res: Response) => {
    logger.info('Log de INFO de teste via API');
    logger.warn('Log de WARN de teste via API');
    logger.error('Log de ERROR de teste via API');
    res.send('Logs de teste adicionados. Verifique /logs');
});

export default router;