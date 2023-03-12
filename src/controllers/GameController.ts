import * as PIXI from 'pixi.js';
import { Chess } from 'chess.js'
import Application from '../Application';
import Events from '../const/Events';

export default class GameController {
    private chessGame: Chess;

    constructor() {
        Application.APP.dispatcher.on(Events.INITIALIZE_GAME, this.initializeGame, this);
    }

    public initializeGame(): void {
        this.chessGame = new Chess()
        Application.APP.model.updateBoardState(this.chessGame.board());
        console.log(this.chessGame.board());
        while (!this.chessGame.isGameOver()) {
        const moves = this.chessGame.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        this.chessGame.move(move)
        }
        console.log(this.chessGame.pgn())
    }
}