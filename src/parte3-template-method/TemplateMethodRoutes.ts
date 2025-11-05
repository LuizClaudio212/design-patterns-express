import { Router, Request, Response } from 'express';
import { PaymentInfo } from './PaymentInfo';
import { AbstractPaymentProcessor } from './processors/AbstractPaymentProcessor';
import { CreditCardProcessor } from './processors/CreditCardProcessor';
import { PaypalProcessor } from './processors/PaypalProcessor';

const router = Router();

router.post('/process', (req: Request, res: Response) => {
    const paymentInfo: PaymentInfo = {
        ...req.body,
        log: [], // Inicia o log
    };

    let processor: AbstractPaymentProcessor;

    // "Fábrica" para selecionar o processador correto
    if (paymentInfo.method === 'credit_card') {
        processor = new CreditCardProcessor();
    } else if (paymentInfo.method === 'paypal') {
        processor = new PaypalProcessor();
    } else {
        return res.status(400).json({ error: 'Método de pagamento inválido' });
    }

    // Chama o TEMPLATE METHOD
    const result = processor.processPayment(paymentInfo); //

    res.status(200).json(result);
});

export default router;