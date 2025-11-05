import { Router, Request, Response } from 'express';
import { NewPaymentSystem } from './new/NewPaymentSystem';
import { PaymentAdapter } from './PaymentAdapter';
import { PaymentService } from './PaymentService';

const router = Router();

// --- CONFIGURAÇÃO DA INJEÇÃO DE DEPENDÊNCIA (simulada) ---
// 1. Criamos a instância real do novo sistema
const newSystem = new NewPaymentSystem();

// 2. Criamos o Adapter, "embrulhando" o novo sistema
const adapter = new PaymentAdapter(newSystem);

// 3. Criamos o Serviço, injetando o ADAPTER
// Note que o Serviço pensa que está recebendo um "LegacyPaymentProcessor"
const paymentService = new PaymentService(adapter);

router.post('/process-payment', (req: Request, res: Response) => {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
        return res.status(400).json({ error: 'orderId e amount são obrigatórios' });
    }

    // O controller chama o serviço, que usa o adapter sem saber
    const result = paymentService.checkout(orderId, amount);

    res.status(200).json(result);
});

export default router;