import Application from "../Application";
import Events from "../const/Events";

export class GameplayManager {
private keyState: { [key: string]: boolean };
private mouseX: number;
private mouseY: number;
private mouseMoveX: number;
private mouseMoveY: number;
private isDragging: boolean;

constructor() {
    this.createMouseEvents();
}

createMouseEvents = (): void => {
    this.keyState = {}
    //prevent right click menu
    document.addEventListener('contextmenu', event => event.preventDefault())

    window.addEventListener('wheel', (e: WheelEvent) => {
        if(e.deltaY < 0){
            this.keyState['zoomIn'] = true
        }
        else if(e.deltaY > 0){
            this.keyState['zoomOut'] = true
        }
    }, {passive: true})


    window.addEventListener('mousedown', (event: MouseEvent) => {
        if(event.button === 0 
            && event.offsetX > 0 && event.offsetX < Application.APP.getRendererWidth()
            && event.offsetY > 0 && event.offsetY < Application.APP.getRendererHeight()){
            this.keyState['leftmouse'] = true
            this.isDragging = true;
        }
    })
    window.addEventListener('mouseup', (event: MouseEvent) => {
        if(event.button === 0){
            this.keyState['leftmouse'] = false
            this.isDragging = false;
        }
    })
    window.addEventListener('mouseupoutside', (event: MouseEvent) => {
        if(event.button === 2){
            this.keyState['rightmouse'] = false
        }
        if(event.button === 0){
            this.keyState['leftmouse'] = false
        }
    })
    window.addEventListener('mousemove', (event: MouseEvent) => {
        if(event.clientX > -1 && event.clientX < Application.APP.getRendererWidth()){
            this.mouseX = event.clientX
            this.mouseMoveX = event.movementX
        }

        if(event.clientY > -1 && event.clientY < Application.APP.getRendererHeight()){
            this.mouseY = event.clientY
            this.mouseMoveY = event.movementY
        }

        if(this.isDragging && (event.clientX < Application.APP.getRendererWidth() || event.clientY < Application.APP.getRendererHeight())){
            Application.APP.dispatcher.emit(Events.PAN_VIEW, this.mouseX, this.mouseY);
        }
    })
    window.addEventListener('click', (evt: MouseEvent) => {
        this.keyState["click"] = true
    })
}
};