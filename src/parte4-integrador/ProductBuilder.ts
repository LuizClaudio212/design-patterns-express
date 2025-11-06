import { Product } from './Product';

// O Builder
export class ProductBuilder {
    private product: Product;

    constructor(id: string, name: string) {
        this.product = new Product(id, name);
    }

    // Métodos "passo a passo"
    withDescription(description: string): ProductBuilder {
        this.product.description = description;
        return this; // Permite o encadeamento
    }

    withPrice(price: number): ProductBuilder {
        this.product.price = price;
        return this;
    }

    withCategory(category: string): ProductBuilder {
        this.product.category = category;
        return this;
    }

    withStock(stock: number): ProductBuilder {
        this.product.stock = stock;
        return this;
    }

    // O método final que retorna o objeto construído
    build(): Product {
        return this.product;
    }
}