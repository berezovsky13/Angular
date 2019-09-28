import { Cell } from './cell';

export class Board {
    rows:Cell[][] = new Array()
   
    createBoard() {
        for (let i = 0; i < 6; i++) {
            let cells:Cell[] = new Array();
            for (let j = 0; j < 7; j++) {
                cells[j] = new Cell();
            }
            this.rows[i] = cells;
        }
        console.log(this.rows);
    }


}
