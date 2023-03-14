import Application from "./Application";
import Events from "./const/Events";
import BoardData from "./interfaces/BoardData";

export default class Model {
    private currentState: BoardData[][];
    private figureIds: string[];

    constructor() {
        this.figureIds = ['p', 'n', 'b', 'r', 'q', 'k'];
    }

    public updateBoardState(state: BoardData[][]): void {
        this.currentState = state;
        Application.APP.dispatcher.emit(Events.UPDATE_BOARD);
    }

    public getFigureIds(): string[] {
        return this.figureIds;
    }

    public getCurrentBoardState(): BoardData[][] {
        return this.currentState;
    }
}