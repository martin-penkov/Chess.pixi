import * as PIXI from 'pixi.js';
import gsap from "gsap";
import { PieceSymbol, Square } from 'chess.js';
import Figure from '../figures/Figure';
import Application from '../../Application';

export default class Cell extends PIXI.Container {
    public isBlack: boolean;
    public yPos: number;
    public xPos: number;
    public cellSize: number;
    public currentFigure: Figure;

    private color: number = 0xF0D9B5;
    private background: PIXI.Graphics;

    constructor(isBlack: boolean, yPos: number, xPos: number, cellSize: number) {
        super()
        this.isBlack = isBlack;
        this.yPos = yPos;
        this.xPos = xPos;
        this.cellSize = cellSize;
        this.init();
        
        this.background.on("pointerup", this.detectInput, this);
    }

    public getCoordinates(): string {
        return `${Application.APP.model.getXCoordsInWord()[this.xPos]}${8 - this.yPos}`;
    }

    private detectInput(): void {
        gsap.to(this.background, {
            alpha: 0.6,
            duration: 0.25,
            yoyo: true,
            repeat: 1
        });

        console.log(`Cell has position ${this.xPos} (X) and ${this.yPos} (Y)`);
    }

    public attachFigure(figure: PIXI.Sprite, pieceSymbol: PieceSymbol): void {
        let scaleRatio = (this.cellSize * 0.75) / figure.width;
        figure.width = this.cellSize * 0.75;
        figure.height *= scaleRatio;
        figure.anchor.set(0.5, 0.5);
        figure.x = this.xPos * this.cellSize + this.cellSize / 2;
        figure.y = this.yPos * this.cellSize + this.cellSize / 2;
        
        // this.currentfigureSprite = figure;
        // this.addChild(figure);
        // this.currentPieceSymbol = pieceSymbol;
    }

    public removeFigure(): void {
        // if(this.currentfigureSprite){
        //     this.removeChild(this.currentfigureSprite);
        //     this.currentPieceSymbol = null;
        // }
    }

    public init(): void {
        this.background = new PIXI.Graphics();
        if(this.isBlack){
            this.color = 0xB58863;
        }
            
        this.background.beginFill(this.color);
        // this.background.lineStyle(1, 0xFF0000);
        this.background.drawRect(0, 0, this.cellSize, this.cellSize);
        this.addChild(this.background);
        this.x = this.xPos * this.cellSize;
        this.y = this.yPos * this.cellSize;
        this.background.interactive = true;
    }
}