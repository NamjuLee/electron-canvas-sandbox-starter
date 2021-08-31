import { CLICK_TYPE, MouseEventData, NVector3 } from '../../../lib';
import { Core } from '../../Core';
export class ActiveCommandController {
    public core: Core;
    public mouse: NVector3 = new NVector3(0, 0);
    constructor(core: Core) {
        this.core = core;
    }
    public MouseEventController(e: MouseEventData) {
        this.core.sandbox.implmentations.MouseEventController(e);

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
        this.MouseDown(e);
    }
    public MouseLeftClick(e: MouseEventData) {/* */ }
    public MouseLeftClickPre(e: MouseEventData) {
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

        this.MouseUp(e);

    }
    public MouseDoubleClick(e: MouseEventData) {/* */ }
    public MouseDoubleClickPre(e: MouseEventData) {
        // console.log('d click');
        this.MouseDoubleClick(e);
    }
    public MouseMove(e: MouseEventData) {/* */ }
    public MouseMovePre(e: MouseEventData) {
        // console.log('move');

        this.MouseMove(e);
    }
    public MouseDrag(e: MouseEventData) {/* */ }
    public MouseDragPre(e: MouseEventData) {
        this.mouse.x = e.x; this.mouse.y = e.y;

        this.core.canvas.Pan(e);

        this.MouseDrag(e);
    }
    public MouseWheel(e: MouseEventData) {/* */ }
    public MouseWheelPre(e: MouseEventData) {
        this.core.canvas.Zoom(e);
        this.MouseWheel(e);
    }
    public pushActionFromPulldown(v: string) {
        const command = v.split('@');
        switch (command[0]) {
            case 'point':
                break;
            default:
                break;
        }

    }
}
