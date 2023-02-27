import * as PIXI from 'pixi.js';
import Board from "./Board";

export default class ViewManager extends PIXI.Container {
    private board: Board;

    constructor() {
        super();
        this.createBoard();
    }

    private createBoard(): void {
        this.board = new Board();
        this.addChild(this.board);
        this.board.x = this.width * 0.1;
        this.board.y = this.height * 0.1;
    }
}