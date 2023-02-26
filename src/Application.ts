import * as PIXI from 'pixi.js';
import Events from './const/Events';
import Controllers from './controllers/Controllers';
import UrlParameter from './interfaces/UrlParameters';

export default class Application extends PIXI.Application {
    private version: string = "beta-0.1";
    private urlParams: UrlParameter[];
    private controllers: Controllers;
    public static APP: Application;
    public dispatcher: PIXI.utils.EventEmitter;

    constructor(options?: PIXI.IApplicationOptions) {
        super(options)
        Application.APP = this;
        this.urlParams = this.getUrlParameters();
        PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

        this.dispatcher = new PIXI.utils.EventEmitter();
        this.controllers = new Controllers();

        this.dispatcher.addListener(Events.AUTHENTICATED, this.createGame, this);
    }

    private createGame(): void {
        //once authenticated display lobby
        //...
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