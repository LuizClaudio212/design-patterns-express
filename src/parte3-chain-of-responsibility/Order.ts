// Este é o objeto que será passado pela cadeia
export class Order {
    public id: string;
    public items: { productId: string; quantity: number }[];
    public isPaid: boolean = false;
    public isValid: boolean = true;
    public statusLog: string[] = [];

    constructor(id: string, items: { productId: string; quantity: number }[]) {
        this.id = id;
        this.items = items;
    }
}