import Application from "../Application";
import Events from "../const/Events";
import ViewManager from "../views/ViewManager";
import * as PIXI from 'pixi.js';

export default class Renderer {
    private currentRotation: number = 0;
    private gameContainer: PIXI.Container;
    private currentWorldRotationX: number = 0;
    private currentWorldRotationY: number = 0;
    private stackedSprites: PIXI.Sprite[] = [];
    private defaultspread: number;
    private zoomLevel: number = 1.0;

    constructor(viewManager: ViewManager) {
        this.gameContainer = viewManager;
        Application.APP.dispatcher.on(Events.PAN_VIEW, this.updateRotation, this);
        Application.APP.dispatcher.on(Events.ZOOM, this.updateZoom, this);
        Application.APP.ticker.add(this.renderTextures);
    }

    private renderTextures(): void {
        
    }

    public saveStackedSprite(sprites: PIXI.Sprite[]): void {
        this.stackedSprites.push(...sprites);
    }

    public updateRotation(updatedMouseX: number, updatedMouseY: number): void {
        const xRotation: number = updatedMouseX - this.currentWorldRotationX;
        const yRotation: number = updatedMouseY - this.currentWorldRotationY;
        this.currentWorldRotationX = xRotation / 20;
        this.currentWorldRotationY = yRotation;
    
        this.stackedSprites.forEach((element, index) => {
            element.rotation = xRotation / 20;
            // let newSpread = this.defaultspread + yRotation / 1000;
			// element.y = 250 - element.height / 2 - index * newSpread;
        });
    }

    private updateZoom(zoom: number): void {
        // Limit the zoom level within a certain range (e.g., 0.5 to 2.0).
        this.zoomLevel += zoom;
        this.zoomLevel = Math.max(0.5, Math.min(2.0, this.zoomLevel));

        // Scale the game container to implement zoom.
        this.gameContainer.scale.set(this.zoomLevel);
    }
}