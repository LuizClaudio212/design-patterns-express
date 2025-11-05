import { Router, Request, Response } from 'express';
import { EcommerceFacade } from './EcommerceFacade';

const router = Router();

// A Facade é um Singleton por natureza (embora não implementada assim)
// O controller só precisa de uma instância dela.
const facade = new EcommerceFacade();

router.post('/place-order', (req: Request, res: Response) => {
    const { customerId, productIds } = req.body;

    if (!customerId || !productIds || !Array.isArray(productIds)) {
        return res.status(400).json({ error: 'customerId e productIds (array) são obrigatórios' });
    }

    // O controller faz UMA chamada simples
    const result = facade.placeOrder(customerId, productIds); // [cite: 45]

    if (result.status === 'success') {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

export default router;