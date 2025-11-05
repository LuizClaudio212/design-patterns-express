import { StockMarket, StockUpdate } from '../StockMarket';

export class EmailObserver {
    constructor(stockMarket: StockMarket) {
        stockMarket.on('priceChange', (data: StockUpdate) => {
            this.sendEmail(data);
        });
    }

    private sendEmail(data: StockUpdate) {
        console.log(`[OBSERVER-EMAIL] Notificação: ${data.symbol} atualizado para R$${data.price}. Enviando e-mail.`);
    }
}