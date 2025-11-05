import { Order } from '../Order';

// A interface que todos os handlers devem seguir [cite: 64]
export interface OrderHandler {
    setNext(handler: OrderHandler): OrderHandler;
    handle(order: Order): Promise<Order | null>; // Tornamos assíncrono
}

// Classe Abstrata para gerenciar o "próximo" handler
export abstract class AbstractOrderHandler implements OrderHandler {
    private nextHandler: OrderHandler | null = null;

    public setNext(handler: OrderHandler): OrderHandler {
        this.nextHandler = handler;
        return handler; // Facilita o encadeamento (ex: h1.setNext(h2).setNext(h3))
    }

    // Lógica padrão de passagem
    public async handle(order: Order): Promise<Order | null> {
        if (this.nextHandler) {
            return this.nextHandler.handle(order);
        }
        // Se não houver próximo, retorna a ordem processada
        return order;
    }
}