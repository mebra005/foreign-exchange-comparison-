class UserInputs {
    amount: number;
    source: string;
    deliveryMethod: string;
    deliveryTime: string;
    currency: string;

    constructor(
    ) {
        this.amount = 0;
        this.source = '';
        this.deliveryMethod = '';
        this.deliveryTime = '';
        this.currency = '';
    }
}

export default UserInputs;
