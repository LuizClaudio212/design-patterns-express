import { StockMarket, StockUpdate } from '../StockMarket';

export class SmsObserver {
    // O construtor "inscreve" o observer no Subject
    constructor(stockMarket: StockMarket) {
        stockMarket.on('priceChange', (data: StockUpdate) => {
            // O 'stockMarket.on' é o método 'subscribe'
            this.sendSms(data);
        });
    }

    // Esta é a ação do observer
    private sendSms(data: StockUpdate) {
        if (data.price > 100) { // Lógica de filtro do observer
            console.log(`[OBSERVER-SMS] Alerta! ${data.symbol} atingiu R$${data.price}. Enviando SMS.`);
        }
    }
}