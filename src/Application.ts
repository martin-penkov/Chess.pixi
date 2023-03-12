import * as PIXI from 'pixi.js';
import Events from './const/Events';
import Controllers from './controllers/Controllers';
import UrlParameter from './interfaces/UrlParameters';
import ViewManager from './views/ViewManager';

export default class Application extends PIXI.Application {
    private version: string = "beta-0.1";
    private urlParams: UrlParameter[];
    private controllers: Controllers;
    public static APP: Application;
    public dispatcher: PIXI.utils.EventEmitter;
    public viewManager: ViewManager;

    constructor(options?: PIXI.IApplicationOptions) {
        super(options)
        Application.APP = this;
        this.urlParams = this.getUrlParameters();
        PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

        this.dispatcher = new PIXI.utils.EventEmitter();
        this.controllers = new Controllers();
        this.renderer.options.antialias = false;

        this.createGame = this.createGame.bind(this);
        this.dispatcher.addListener(Events.AUTHENTICATED, this.createGame, this);
        this.loadAssets();
    }

    private createGame(): void {
        //once authenticated display lobby
        //...
        this.viewManager = new ViewManager();
        this.stage.addChildAt(this.viewManager, 0);
    }

    private loadAssets(): void {
        this.loader
        .add('./assets/chessSprites.png')
        .load(this.createGame);
    }

    public getUrlParameters(): UrlParameter[] {
        let urlParams: UrlParameter[] = [];
        location.search.substr(1).split("&").forEach(
            (item: string) => {
                let tmp: string[] = item.split("=");
                if (tmp[0].length > 0) {
                    urlParams.push({ key: tmp[0], value: decodeURIComponent(tmp[1])} as UrlParameter);
                }
            });

        return urlParams;
    }
}