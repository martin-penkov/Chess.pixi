import Application from "./Application";
import Events from "./const/Events";
import BoardData from "./interfaces/BoardData";

export default class Model {
    private currentState: BoardData[][];

    constructor() {

    }

    public updateBoardState(state: BoardData[][]): void {
        this.currentState = state;
        Application.APP.dispatcher.emit(Events.UPDATE_BOARD);
    }

    public getCurrentBoardState(): BoardData[][] {
        return this.currentState;
    }
}