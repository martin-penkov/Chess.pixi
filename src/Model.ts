import { Chess } from "chess.js";
import Application from "./Application";
import Events from "./const/Events";
import { PieceSprite } from "./const/PieceSprite";
import BoardData from "./interfaces/BoardData";

export default class Model {
    private currentState: BoardData[][];
    private figureIds: Map<PieceSprite, number>;
    private chessGame: Chess;

    constructor() {
        this.figureIds = new Map<PieceSprite, number>([[PieceSprite.p, 8], [PieceSprite.n, 2], [PieceSprite.b, 2], [PieceSprite.r, 2], [PieceSprite.q, 1], [PieceSprite.k, 1]]);
    }

    public updateBoardState(state: BoardData[][]): void {
        this.currentState = state;
        Application.APP.dispatcher.emit(Events.UPDATE_BOARD);
    }

    public setCurrentChessGame(chessGame: Chess): void {
        this.chessGame = chessGame
    }

    public getChessGame(): Chess { 
        return this.chessGame;
    }

    public getXCoordsInWord(): string[] {
        return ["a", "b", "c", "d", "e", "f", "g", "h"];
    }

    public getFigureIds(): Map<PieceSprite, number> {
        return this.figureIds;
    }

    public getCurrentBoardState(): BoardData[][] {
        return this.currentState;
    }
}