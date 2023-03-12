import * as PIXI from 'pixi.js';
import Application from '../../Application';
import Events from '../../const/Events';
import BoardData from '../../interfaces/BoardData';
import Cell from './Cell';

enum PieceSprite {
    'p' = "pawn",
    'n' = "knight",
    'b' = "bishop",
    'r' = "rook",
    'q' = "queen",
    'k' = "king"
}

export default class Board extends PIXI.Container {
    private cells: Array<Cell> = [];
    private background: PIXI.Sprite;
    private cellSize: number = 100;

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
        
        
        // this.cells.forEach(cell => {
        //     let sprite = new PIXI.Sprite(Application.APP.loader.resources["spriteSheet"].spritesheet.textures["queen"]);
        //     cell.attachFigure(sprite);
        // });
    }

    private updateBoard(): void {
        const boardState: BoardData[][] = Application.APP.model.getCurrentBoardState();

        boardState.forEach((row: BoardData[], yPos: number) => {
            row.forEach((cell: BoardData, xPos: number) => {
                let viewCell: Cell = this.cells.find(cell => cell.xPos === xPos && cell.yPos === yPos)
                if((!cell && !viewCell.currentPieceSymbol) || (cell && viewCell.currentPieceSymbol === cell.type)) {
                    return;
                }

                let sprite = new PIXI.Sprite(Application.APP.loader
                    .resources["spriteSheet"]
                    .spritesheet
                    .textures[`${PieceSprite[cell.type]}-${cell.color === "w" ? "white" : "black"}`]);
                //to be refactored ... reuse sprites
                viewCell.attachFigure(sprite, cell.type);
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