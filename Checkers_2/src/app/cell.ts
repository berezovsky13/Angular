export class Cell {
    hasCoin:Boolean;
    playerNum:Number;

    constructor() {
        this.hasCoin = false;
    }

    addCoin(playerNum) {
        this.playerNum = playerNum;
        this.hasCoin = true;
    }

}
