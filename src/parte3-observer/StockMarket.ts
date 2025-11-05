import { EventEmitter } from 'events'; // Importa o "Observer" nativo do Node

export type StockUpdate = {
    symbol: string;
    price: number;
};

// O StockMarket é o "Subject" (Observable)
export class StockMarket extends EventEmitter {
    private static instance: StockMarket;

    // Usamos Singleton aqui para que todos os observers
    // e rotas acessem o MESMO emissor de eventos
    private constructor() {
        super(); // Chama o construtor do EventEmitter
    }

    public static getInstance(): StockMarket {
        if (!StockMarket.instance) {
            StockMarket.instance = new StockMarket();
        }
        return StockMarket.instance;
    }

    // Método para simular a mudança de preço
    public updateStockPrice(symbol: string, price: number) {
        const stockUpdate: StockUpdate = { symbol, price };
        console.log(`[StockMarket] ATUALIZAÇÃO: ${symbol} está em R$${price}`);

        // Notifica todos os observers inscritos no evento 'priceChange'
        this.emit('priceChange', stockUpdate);
    }
}