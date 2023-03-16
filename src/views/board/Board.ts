import { Chess, Piece, Square, SQUARES } from 'chess.js';
import * as PIXI from 'pixi.js';
import Application from '../../Application';
import Events from '../../const/Events';
import { PieceSprite } from '../../const/PieceSprite';
import BoardData from '../../interfaces/BoardData';
import Figure from '../figures/Figure';
import Cell from './Cell';



export default class Board extends PIXI.Container {
    private cells: Array<Cell> = [];
    private background: PIXI.Sprite;
    private cellSize: number = 100;
    private figures: Figure[] = [];

    constructor() {
        super();
        this.createBackground();
        this.createCells();
        this.createFigures();
        Application.APP.dispatcher.on(Events.UPDATE_BOARD, this.updateBoard, this);
    }

    private createCells(): void {
        for (var i = 0; i < 8; ++i){
            let isEvenRow: boolean = false;
            if(i % 2 === 0){
                isEvenRow = true;
            }
            
            for (var j = 0; j < 8; ++j){
                
                let isBlack: boolean = false;
                if((!isEvenRow && j % 2 === 0) || (isEvenRow && j % 2 !== 0)) {
                    isBlack = true;
                }
                
                const cell: Cell = new Cell(isBlack, i, j, this.cellSize);
                this.addChild(cell)
                this.cells.push(cell);
            }
          }
    }

    private createFigures(): void {
        const figureIds = Application.APP.model.getFigureIds();

        for(let key of Array.from(figureIds.keys())) {
            for (let index = 0; index < figureIds.get(key as PieceSprite); index++) {
                this.figures.push(new Figure(key, false, this.cellSize));
            }
        }

        for(let key of Array.from(figureIds.keys())) {
            for (let index = 0; index < figureIds.get(key as PieceSprite); index++) {
                this.figures.push(new Figure(key, true, this.cellSize));
            }
        }

        this.figures.forEach(figure => {
            this.addChild(figure);
        });
    }

    private updateBoard(): void {
        const boardState: BoardData[][] = Application.APP.model.getCurrentBoardState();

        boardState.forEach((row: BoardData[], yPos: number) => {
            row.forEach((cell: BoardData, xPos: number) => {
                let viewCell: Cell = this.cells.find(cell => cell.xPos === xPos && cell.yPos === yPos)

                if(!cell){
                    return;
                }

                let figure: Figure = this.figures.find(figure => {
                    if(figure.figureType !== PieceSprite[cell.type] || (figure.isBlack !== (cell.color === "b"))){
                        return false;
                    }

                    if(!figure.currentCell){
                        console.log(`figure has not been used before. is black ${figure.isBlack} ${figure.figureType}`);
                        return true;
                    }
                    const piece: Piece = Application.APP.model.getChessGame().get(figure.currentCell.getCoordinates() as Square);
                    //check if figure location is still the same or not
                    //if not then this is the piece we need to move
                    //optimization for reusing figures
                    if(figure.figureType === PieceSprite[piece.type] && figure.isBlack === (piece.color === "b")){
                        return false;
                    }

                    return true;
                });

                const piece: Piece = Application.APP.model.getChessGame().get(cell.square);
                if(viewCell.currentFigure && viewCell.currentFigure.figureType === PieceSprite[piece.type] && viewCell.currentFigure.isBlack === (piece.color === "b")){
                    //figure not moved
                    return;
                }

                if(figure){
                    if(viewCell.currentFigure && (viewCell.currentFigure.isBlack !== figure.isBlack)){
                        //figure taken
                        viewCell.currentFigure.currentCell = null;
                        viewCell.currentFigure.visible = false;
                    }

                    figure.changeCell(viewCell);
                }
            })
        });
    }

    private createBackground(): void {
        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.width = this.cellSize * 8;
        this.background.height = this.cellSize * 8;
        this.addChild(this.background);
    }
}