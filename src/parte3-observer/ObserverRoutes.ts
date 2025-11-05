import { Router, Request, Response } from 'express';
import { StockMarket } from './StockMarket';
import { SmsObserver } from './observers/SmsObserver';
import { EmailObserver } from './observers/EmailObserver';

const router = Router();

// --- CONFIGURAÇÃO (Inscrição dos Observers) ---
// Obtém a instância ÚNICA do StockMarket
const stockMarket = StockMarket.getInstance();

// "Inscreve" os observadores. Isso é feito apenas uma vez na inicialização.
new SmsObserver(stockMarket);
new EmailObserver(stockMarket);
console.log('[Observer] Observadores de SMS e E-mail inscritos no StockMarket.');

// API para simular mudanças de preço
router.post('/update-price', (req: Request, res: Response) => {
    const { symbol, price } = req.body;

    if (!symbol || price === undefined) {
        return res.status(400).json({ error: 'symbol e price são obrigatórios' });
    }

    // O Subject notifica os observers
    stockMarket.updateStockPrice(symbol, price);

    res.status(200).json({ message: 'Preço atualizado e observadores notificados.' });
});

export default router;