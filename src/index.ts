import "./styles.css";
import * as _ from "lodash";
import * as PIXI from "pixi.js";


const app = new PIXI.Application({
    width: window.screen.width,
    height: window.screen.height
})

document.body.appendChild(app.view)
