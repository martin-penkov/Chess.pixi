import Cell from "../board/Cell";
import * as PIXI from 'pixi.js';
import { PieceSprite } from "../../const/PieceSprite";
import Application from "../../Application";
import gsap from "gsap";

export default class Figure extends PIXI.Container {
    public figureType: string;
    public isBlack: boolean;
    public currentCell: Cell;
    private figureSprite: PIXI.Sprite;
    private cellSize: number;

    constructor(type: string, isBlack: boolean, cellSize: number, cellReference: Cell) {
        super();
        this.figureType = type;
        this.isBlack = isBlack;
        this.currentCell = cellReference;
        this.cellSize = cellSize;

        this.init();
    }

    private init(): void {
        this.figureSprite = new PIXI.Sprite(Application.APP.loader
            .resources["spriteSheet"]
            .spritesheet
            .textures[`${this.figureType}-${this.isBlack ? "black" : "white"}`]);
            this.addChild(this.figureSprite);

        let scaleRatio = (this.cellSize * 0.75) / this.figureSprite.width;
        this.figureSprite.width = this.cellSize * 0.75;
        this.figureSprite.height *= scaleRatio;
        this.figureSprite.anchor.set(0.5, 0.5);

        this.animatePositon();
    }

    private animatePositon(): void {
        this.x = this.currentCell.x + this.currentCell.width / 2
        this.y = this.currentCell.y + this.currentCell.height / 2
        // gsap.to(this, {
        //     x: this.currentCell.x + this.currentCell.width / 2,
        //     y: this.currentCell.y + this.currentCell.height / 2,
        //     duration: 0.1
        // });
    }
}