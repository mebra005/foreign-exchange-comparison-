class Company {
    _id: string;
    name: string;
    rate: number;
    date: Date;

    constructor(
    ) {
        this.name = '';
        this.rate = 0;
        this.date = new Date();
    }
}

export default Company;
