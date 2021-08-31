import { CLICK_TYPE, MouseEventData, NVector3 } from '../../../../lib';
import { GeometryBase } from '../../SimpleCadSystem/Geometry/Base/GeometryBase';
import { SimpleCadSystem } from '..';
import { NPoint } from '../Geometry/NPoint';

export class ActiveCommandController {
    public implementation: SimpleCadSystem;
    public mouse: NVector3 = new NVector3(0, 0);
    public capture: GeometryBase | undefined = undefined;
    private _ablePan: boolean = false;
    constructor(implementation: SimpleCadSystem) {
        this.implementation = implementation;
    }
    public MouseEventController(e: MouseEventData) {
        this.mouse.x = e.x; this.mouse.y = e.y;

        if (e.CLICK_TYPE === CLICK_TYPE.LEFT) {
            this.MouseLeftClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.MIDDLE) {
            this.MouseMiddleClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DOWN_RIGHT) {
            this.MouseRightClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DOUBLE) {
            this.MouseDoubleClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.MOVE) {
            this.MouseMovePre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DRAG) {
            this.MouseDragPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DOWN) {
            this.MouseDownPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.WHEEL) {
            this.MouseWheelPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.UP) { this.MouseUpPre(e); return; }


    }
    // .......................................................
    public MouseDown(e: MouseEventData) {/* */ }
    public MouseDownPre(e: MouseEventData) {
        const geo = this.implementation.geometryCommon.Pick(this.mouse);
        if (geo) {
            this.ablePan = false;
            this.capture = geo;
        }
        console.log(geo);
        this.MouseDown(e);
    }
    public MouseLeftClick(e: MouseEventData) {/* */ }
    public MouseLeftClickPre(e: MouseEventData) {
        console.log(e);
        new NPoint(this.implementation.scene, e.x, e.y, 0);

        // console.log('left click');
        this.MouseLeftClick(e);
    }
    public MouseMiddleClick(e: MouseEventData) {/* */ }
    public MouseMiddleClickPre(e: MouseEventData) {

        this.MouseMiddleClick(e);
    }
    public MouseRightClick(e: MouseEventData) { /* */ }
    public MouseRightClickPre(e: MouseEventData) {

        this.MouseRightClick(e);
    }
    public MouseUp(e: MouseEventData) { /* */ }
    public MouseUpPre(e: MouseEventData) {

        this.ablePan = true;
        this.capture = undefined;
        this.MouseUp(e);
    }
    public MouseDoubleClick(e: MouseEventData) {/* */ }
    public MouseDoubleClickPre(e: MouseEventData) {
        // console.log('d click');
        this.MouseDoubleClick(e);
    }
    public MouseMove(e: MouseEventData) {/* */ }
    public MouseMovePre(e: MouseEventData) {
        this.implementation.geometryCommon.UpdateHover(this.mouse);
        // console.log('move');
        this.MouseMove(e);
    }
    public MouseDrag(e: MouseEventData) {/* */ }
    public MouseDragPre(e: MouseEventData) {
        if (this.capture) {
            this.capture.Translation(e);
        }
        this.MouseDrag(e);
    }
    public MouseWheel(e: MouseEventData) {/* */ }
    public MouseWheelPre(e: MouseEventData) {

        this.MouseWheel(e);
    }
    public get ablePan() {
        return this._ablePan;
    }
    public set ablePan(v: boolean) {
        this.implementation.implmentations.sandbox.core.canvas.ablePan = v;
        this._ablePan = v;
    }
}