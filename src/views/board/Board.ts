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
        // this.createFigures();
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
    
    private updateBoard(): void {
        const boardState: BoardData[][] = Application.APP.model.getCurrentBoardState();

        boardState.forEach((row: BoardData[], yPos: number) => {
            row.forEach((cell: BoardData, xPos: number) => {
                let viewCell: Cell = this.cells.find(cell => cell.xPos === xPos && cell.yPos === yPos)

                if(!cell){   
                    const prevCellFigure: Figure = this.figures.find(figure => figure.currentCell === viewCell);
                    if(prevCellFigure) {
                        this.figures.splice(this.figures.indexOf(prevCellFigure), 1)[0].destroy({children: true});
                        viewCell.currentFigure = null;
                    }
                    return;
                }

                if(viewCell.currentFigure && viewCell.currentFigure.figureType === PieceSprite[cell.type] && viewCell.currentFigure.isBlack === (cell.color === "b")){
                    return;
                }

                if(viewCell.currentFigure && viewCell.currentFigure.isBlack !== (cell.color === "b")){
                    this.figures.splice(this.figures.indexOf(viewCell.currentFigure), 1)[0].destroy({children: true});
                }

                const newFigure: Figure = new Figure(PieceSprite[cell.type], cell.color === "b", this.cellSize, viewCell)
                viewCell.currentFigure = newFigure
                this.figures.push(newFigure);
                this.addChild(newFigure);
            })
        });
        let count: number = 0;
        boardState.forEach(COLUMN => {
            COLUMN.forEach(CELL => {
                if(CELL !== null){count++;}
            });
        });

        // test code !! 
        // console.log("API FIGURE COUNT IS: " + count + " AND VIEW FIGURE COUNT IS: " + this.figures.length);
        // if(count !== this.figures.length){
        //     console.log("figures count doesnt match");
        // }
    }

    private createBackground(): void {
        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.width = this.cellSize * 8;
        this.background.height = this.cellSize * 8;
        this.addChild(this.background);
    }
}