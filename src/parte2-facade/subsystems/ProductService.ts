export type Product = { id: string; name: string; price: number };
export class ProductService {
    checkStock(productId: string, quantity: number): boolean {
        console.log(`[ProductService] Verificando estoque de ${productId}`);
        return true; // Simula que sempre tem estoque
    }
    getProduct(id: string): Product {
        console.log(`[ProductService] Buscando produto ${id}`);
        return { id, name: 'Produto Fictício', price: 99.99 };
    }
}