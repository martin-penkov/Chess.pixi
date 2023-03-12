import * as PIXI from 'pixi.js';
import Cell from './Cell';

export default class Board extends PIXI.Container {
    private cells: Array<Cell>;
    private background: PIXI.Sprite;
    private cellSize: number = 100;

    constructor() {
        super();
        this.createBackground();
        this.createSquares();
    }

    private createSquares(): void {
        for (var i = 0; i < 8; ++i){
            var row: PIXI.Container = new PIXI.Container();
            
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
                row.addChild(cell)
            }
            this.addChild(row);
            row.y = i * this.cellSize;
          }
    }

    private createBackground(): void {
        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.width = this.cellSize * 8;
        this.background.height = this.cellSize * 8;
        this.addChild(this.background);
    }
}