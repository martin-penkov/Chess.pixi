import * as PIXI from 'pixi.js';
import Application from '../Application';
import Board from "./board/Board";
import Renderer from '../utils/Renderer';

export default class ViewManager extends PIXI.Container {
    private board: Board;
	private renderer: Renderer;

	private spread: number = 5;
	private rotateValue: number = 0;

	private pawnSprites: PIXI.Sprite[] = [];

    

    constructor() {
        super();
		this.renderer = new Renderer(this);
        this.createBoard();
		this.initiateSceneGeneration();
    }

    private initiateSceneGeneration(): void {
		let pawnSheet: PIXI.utils.Dict<PIXI.Texture<PIXI.Resource>> = Application.APP.loader.resources["pawn"].spritesheet.textures;
		
		let index = 0;
		for(let textureName in pawnSheet) {
			const textureRef: PIXI.Texture = pawnSheet[textureName];
			const pawnSprite = new PIXI.Sprite(textureRef);
			this.pawnSprites.push(pawnSprite);
			this.addChild(pawnSprite)
			let scaleRatio = (100 * 0.75) / pawnSprite.width;
			pawnSprite.width = 100 * 0.75;
			pawnSprite.height *= scaleRatio;
			pawnSprite.x = 250 - pawnSprite.width / 2;
			pawnSprite.y = 250 - pawnSprite.height / 2 - index * this.spread;
			index++;
		}
		this.renderer.saveStackedSprite(this.pawnSprites);
	}

    update(){
		
	}

    getdist(x1: number, y1: number, x2: number, y2: number){
		return Math.sqrt(
			Math.pow((x2 - x1), 2)
			+
			Math.pow((y2 - y1), 2)
			)
	}


    private createBoard(): void {
        this.board = new Board();
        this.addChild(this.board);
        this.board.x = this.width * 0.1;
        this.board.y = this.height * 0.1;
    }
}