import { AbstractOrderHandler } from './AbstractOrderHandler';
import { Order } from '../Order';

// Validador de inventário
export class InventoryValidator extends AbstractOrderHandler {
    public async handle(order: Order): Promise<Order | null> {
        console.log('[InventoryValidator] Verificando estoque...');
        order.statusLog.push('Verificando estoque');

        // Simula estoque insuficiente para o "prod_000"
        const hasInsufficientStock = order.items.some(
            (item) => item.productId === 'prod_000' && item.quantity > 5
        );

        if (hasInsufficientStock) {
            console.error('[InventoryValidator] ESTOQUE INSUFICIENTE. Processo interrompido.');
            order.isValid = false;
            order.statusLog.push('Falha: Estoque insuficiente.');
            // Interrompe a cadeia (não chama super.handle) 
            return order;
        }

        console.log('[InventoryValidator] Estoque OK.');
        order.statusLog.push('Estoque OK.');

        // Passa para o próximo handler da cadeia
        return super.handle(order);
    }
}

