import { Customer } from "./CustomerService";
import { Product } from "./ProductService";

export class OrderService {
    createOrder(customer: Customer, products: Product[]): string {
        console.log(`[OrderService] Criando pedido para ${customer.name}`);
        const orderId = `order_${Date.now()}`;
        console.log(`[OrderService] Pedido ${orderId} criado.`);
        return orderId;
    }
}