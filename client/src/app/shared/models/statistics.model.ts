class Statistics {
    name: string;
    youPay: Number;
    sendAmount: Number;
    theyGet: Number;
    fee: Number;
    feeIncluded: string;
    trueCost: Number;
    trueCostPercentage: Number;

    constructor(
    ) {
        this.name = '';
        this.youPay = 0;
        this.sendAmount = 0;
        this.theyGet = 0;
        this.fee = 0;
        this.feeIncluded = '';
        this.trueCost = 0;
        this.trueCostPercentage = 0;
    }
}

export default Statistics;
