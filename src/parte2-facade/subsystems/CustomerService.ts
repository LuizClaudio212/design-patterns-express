export type Customer = { id: string; name: string; email: string };
export class CustomerService {
    getCustomer(id: string): Customer {
        console.log(`[CustomerService] Buscando cliente ${id}`);
        return { id, name: 'Cliente Fictício', email: 'cliente@exemplo.com' };
    }
}