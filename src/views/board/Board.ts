import * as PIXI from 'pixi.js';
import Application from '../../Application';
import Cell from './Cell';

export default class Board extends PIXI.Container {
    private cells: Array<Cell> = [];
    private background: PIXI.Sprite;
    private cellSize: number = 100;

    constructor() {
        super();
        this.createBackground();
        this.createCells();
        this.createFigures();
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
        
        
        this.cells.forEach(cell => {
            let sprite = new PIXI.Sprite(Application.APP.loader.resources["spriteSheet"].spritesheet.textures["queen"]);
            cell.attachFigure(sprite);
        });
    }

    private createBackground(): void {
        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.width = this.cellSize * 8;
        this.background.height = this.cellSize * 8;
        this.addChild(this.background);
    }
}