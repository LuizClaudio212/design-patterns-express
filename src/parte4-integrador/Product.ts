
// O objeto complexo que o Builder irá construir
export class Product {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public category: string;
    public stock: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        // Valores padrão
        this.description = 'Sem descrição';
        this.price = 0;
        this.category = 'Geral';
        this.stock = 0;
    }

    // Método para facilitar a exibição
    public getDetails() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            category: this.category,
            stock: this.stock,
        };
    }
}