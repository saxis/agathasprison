export class Npc {
    private _hp: number;

    constructor(public startingHp: number) {}

    get hp() {
        return this._hp;
    }

    set hp(val: number) {
        if (val > 0) {
            this._hp = val;
        }
    }
    
    heal(amount: number) {
        this.hp += amount;
    }

    takedamage(amount: number) {
        this.hp -= amount;
    }

}