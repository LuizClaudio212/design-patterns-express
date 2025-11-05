import { AbstractOrderHandler } from './AbstractOrderHandler';
import { Order } from '../Order';

// Detector de Fraude 
export class FraudDetector extends AbstractOrderHandler {
    public async handle(order: Order): Promise<Order | null> {
        console.log('[FraudDetector] Verificando fraude...');
        order.statusLog.push('Verificando fraude');

        // Simula fraude se o pedido tiver ID "123"
        if (order.id === '123') {
            console.error('[FraudDetector] ALTA SUSPEITA DE FRAUDE. Processo interrompido.');
            order.isValid = false;
            order.statusLog.push('Falha: Suspeita de fraude detectada.');
            // Interrompe a cadeia
            return order;
        }

        console.log('[FraudDetector] Verificação de fraude OK.');
        order.statusLog.push('Verificação de fraude OK.');

        // Passa para o próximo
        return super.handle(order);
    }
}