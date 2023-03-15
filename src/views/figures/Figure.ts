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

    constructor(type: string, isBlack: boolean, cellSize: number) {
        super();
        this.figureType = type;
        this.isBlack = isBlack;

        this.figureSprite = new PIXI.Sprite(Application.APP.loader
            .resources["spriteSheet"]
            .spritesheet
            .textures[`${type}-${isBlack ? "black" : "white"}`]);
            this.addChild(this.figureSprite);

        let scaleRatio = (cellSize * 0.75) / this.figureSprite.width;
        this.figureSprite.width = cellSize * 0.75;
        this.figureSprite.height *= scaleRatio;
        this.figureSprite.anchor.set(0.5, 0.5);
    }

    public changeCell(cell: Cell): void {
        this.currentCell = cell;

        this.x = this.currentCell.x + this.currentCell.width / 2;
        this.y = this.currentCell.y + this.currentCell.height / 2;
    }
}