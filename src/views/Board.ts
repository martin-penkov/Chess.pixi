import * as PIXI from 'pixi.js';

export default class Board extends PIXI.Container {
    private cells: number;
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
                const square: PIXI.Graphics = new PIXI.Graphics();
                let squareColor: number = 0xF0D9B5;
                if((!isEvenRow && j % 2 === 0) || (isEvenRow && j % 2 !== 0)) {
                    squareColor = 0xB58863;
                }
                square.beginFill(squareColor);
                // square.lineStyle(1, 0xFF0000);
                square.drawRect(0, 0, this.cellSize, this.cellSize);
                row.addChild(square)
                square.x = j * this.cellSize;
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