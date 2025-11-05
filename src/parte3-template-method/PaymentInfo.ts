export type PaymentInfo = {
    amount: number;
    method: 'credit_card' | 'paypal';
    cardDetails?: { number: string; cvv: string };
    paypalEmail?: string;
    log: string[];
};