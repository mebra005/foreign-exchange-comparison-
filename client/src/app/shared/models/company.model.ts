 import Currency from './currency.model';


class Company {
    _id: string;
    name: string;
    maxLimit: number;
    source: [string];
    deliveryMethod: [string];
    currency: Currency;
    date: Date;

    constructor(
    ) {
        this.name = '';
        this.date = new Date();
        this.maxLimit = 0;
        this.source = [''];
        this.deliveryMethod = [''];
        this.currency = new Currency();
        }
    }

export default Company;
