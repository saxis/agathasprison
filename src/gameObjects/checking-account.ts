export class CheckingAccount {
    private _balance = 0; //field

    get balance() { // get block
        return this._balance;
    }

    set balance(val:number) { // set block
        this._balance = val;
    }

    deposit(amount: number) {
        this.balance +=  amount;
    }

    withdrawal(amount: number) {
        this.balance -= amount;
    }

}