import * as PIXI from 'pixi.js';
import AuthController from './AuthController';
import GameController from './GameController';

export default class Controllers {
    private authController: AuthController;
    private gameController: GameController;

    constructor() {
        this.authController = new AuthController();
        this.gameController = new GameController();
    }
}