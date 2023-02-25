import './templates/styles.css';
import * as _ from 'lodash';
import * as PIXI from 'pixi.js';
import Application from './Application';


const app = new Application({
    resizeTo: window,
    autoDensity: true,
    width: window.innerWidth,
    height: window.innerHeight
} as PIXI.IApplicationOptions)

document.body.appendChild(app.view)
