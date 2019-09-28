import { Component } from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Board } from './board';
import { Cell } from './cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // What kind of elements do you need for the state?
  private titleText:String
  private board:Board;

  // What data do you care about?
  private playerTurn:Number;
  private turnNumber:Number;
  private ongoingGame:Boolean = false;
  
  // What functions do we need?
  // 1. New game (clears the board)
  // randomly select a player to start.
  newGame() {
    this.board = new Board();
    this.board.createBoard();
    this.playerTurn = 1;
    this.ongoingGame = true;
  }

  // 2. Make Move, 
  // graphically add a circle to the board
  // check if the player just won
  // if not, pass the turn
  makeMove(col) {
    console.log(col);
    let canAddCoin:Boolean = false;
    let nextRow;
    for (let row = this.board.rows.length - 1; row >= 0; row--) {
      if (!this.board.rows[row][col].hasCoin) {
        canAddCoin = true;
        nextRow = row;
        break;
      }
    }
    // Is column (j) full?
    if (!canAddCoin) {
      alert("Column is full")
      return;
    }
    // If not, add coin
    this.board.rows[nextRow][col].addCoin(this.playerTurn);

    // check if the current player won
    // Check the columns
    let currentMaxCoins = 0;
    for (let row = this.board.rows.length - 1; row >= 0; row--) {
      let cell = this.board.rows[row][col];
      if (!cell.hasCoin) {
        currentMaxCoins = 0;
        break;
      }
      if (cell.playerNum == this.playerTurn) {
        currentMaxCoins++;
      } else {
        currentMaxCoins = 0;
      }
      if (currentMaxCoins == 4) {
        alert("WON GAME!");
        return;
      }
    }

    currentMaxCoins = 0;
    // this.board.rows[nextRow]
    for (let column = 0; col < this.board.rows[nextRow].length; col++) {
      let cell = this.board.rows[nextRow][col];
      if (!cell.hasCoin) {
        currentMaxCoins = 0;
        break;
      }
      if (cell.playerNum == this.playerTurn) {
        currentMaxCoins++;
      } else {
        currentMaxCoins = 0;
      }
      if (currentMaxCoins == 4) {
        alert("WON GAME!");
        return;
      }
    }
    // if he didn't, switch turns
    this.playerTurn = this.playerTurn == 1 ? 2 : 1;
  }

  
}
