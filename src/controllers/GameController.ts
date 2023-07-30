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
        Application.APP.model.setCurrentChessGame(this.chessGame);
        Application.APP.model.updateBoardState(this.chessGame.board());
        this.chessGame.moves();
        console.log(this.chessGame.board());
        console.log(this.chessGame.pgn())
        setTimeout(() => { 
            this.makeRandomMove()
        }, 2000);
        
    }

    public getChessGame(): Chess {
        return this.chessGame;
    }

    private makeRandomMove () {
        var possibleMoves = this.chessGame.moves()
      
        // exit if the game is over
        if (this.chessGame.isGameOver()) return
      
        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        this.chessGame.move(move)

        // console.log(this.chessGame.pgn())
        Application.APP.model.updateBoardState(this.chessGame.board());
        setTimeout(() => { this.makeRandomMove() }, 1500)
      }
}