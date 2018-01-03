import Currency from './currency.model';

class RefCompany {
    _id: string;
    name: string;
    currency: Currency;
    date: Date;

    constructor(
    ) {
        this.name = '';
        this.currency = new Currency();
        this.date = new Date();
    }
}

export default RefCompany;
