import { CustomerService, Customer } from './subsystems/CustomerService';
import { ProductService, Product } from './subsystems/ProductService';
import { OrderService } from './subsystems/OrderService';
import { PaymentService } from './subsystems/PaymentService';

export class EcommerceFacade {
    // A Facade conhece todos os subsistemas
    protected customerService: CustomerService;
    protected productService: ProductService;
    protected orderService: OrderService;
    protected paymentService: PaymentService;

    constructor() {
        // Em um app real, eles seriam injetados
        this.customerService = new CustomerService();
        this.productService = new ProductService();
        this.orderService = new OrderService();
        this.paymentService = new PaymentService();
    }

    // Este é o método simplificado que a atividade pede 
    public placeOrder(
        customerId: string,
        productIds: string[]
    ): { status: string; orderId?: string } {
        console.log('--- FACADE: Iniciando o "Place Order" ---');

        // 1. Buscar cliente
        const customer = this.customerService.getCustomer(customerId);

        // 2. Buscar produtos e calcular total
        let totalAmount = 0;
        const products: Product[] = [];
        for (const id of productIds) {
            // 3. Verificar estoque
            if (!this.productService.checkStock(id, 1)) {
                console.log(`Produto ${id} fora de estoque.`);
                return { status: 'failed', orderId: undefined };
            }
            const product = this.productService.getProduct(id);
            products.push(product);
            totalAmount += product.price;
        }

        // 4. Criar pedido
        const orderId = this.orderService.createOrder(customer, products);

        // 5. Processar pagamento
        const paymentSuccess = this.paymentService.processPayment(
            orderId,
            totalAmount
        );

        if (paymentSuccess) {
            console.log('--- FACADE: Pedido concluído com sucesso ---');
            return { status: 'success', orderId: orderId };
        } else {
            console.log('--- FACADE: Falha no pagamento ---');
            return { status: 'payment_failed', orderId: orderId };
        }
    }
}