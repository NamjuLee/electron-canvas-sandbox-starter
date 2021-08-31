import { CLICK_TYPE, MouseEventData } from '../../../../lib';
import { IOWrapper } from '../../IOWrapper';

export interface IMouseInteractionMenu {
  MouseInteractionMenu: (mouseEventData: MouseEventData) => void;
}
export class MouseInteraction {
  public mouseInteractionUI: IMouseInteractionMenu;
  public mouseEventDataPre: MouseEventData = new MouseEventData();
  public isEnable: boolean = true;
  public clickCount: number = 0;
  public click: boolean = false;
  public prevent: boolean = false;
  public delay: number = 250;
  public timer: NodeJS.Timer | number;
  public down: boolean = false;
  public e: MouseEventData;
  public ioWrapper: IOWrapper;
  private _stopPropagation: boolean = false;
  constructor(ioWrapper: IOWrapper) {
    this.ioWrapper = ioWrapper;
  }
  public InitNativeMouseEvent(div: HTMLElement) {
    div.onclick = (e: MouseEvent) => {
      this.prevent = false;
      this.timer = setTimeout(
        () => {
          if (!this.prevent) {
            this.MouseClick(e);
          }
          this.prevent = false;
        },
        this.delay);
    };
    div.ondblclick = (e: MouseEvent) => {
      clearTimeout(this.timer as number);
      this.prevent = true;
      this.MouseDoubleClick(e);
    };
    div.onmousedown = (e: MouseEvent) => { this.MouseDown(e); };
    div.onmouseup = (e: MouseEvent) => { this.MouseUp(e); };
    div.onmousemove = (e: MouseEvent) => { this.MouseMove(e); };
    div.addEventListener('wheel', (e: WheelEvent) => this.MouseWheel(e, e.deltaY));
  }
  public MouseDown(e: MouseEvent) {
    this.click = true;
    this.down = true;
    let mEvent = this.CommonEventBuilder(e);
    mEvent.CLICK_TYPE = CLICK_TYPE.DOWN;
    mEvent.isDown = true;
    this.MouseEvenEmitting(mEvent);
  }
  public MouseClick(e: MouseEvent) {
    if (!this.click) { return; }
    let mEvent = this.CommonEventBuilder(e);
    if (e.button === 0) {
      mEvent.CLICK_TYPE = CLICK_TYPE.LEFT;
    } else if (e.button === 1) {
      mEvent.CLICK_TYPE = CLICK_TYPE.MIDDLE;
    } else if (e.button === 2) {
      mEvent.CLICK_TYPE = CLICK_TYPE.RIGHT;
    }
    this.MouseEvenEmitting(mEvent);
  }
  public MouseDoubleClick(e: MouseEvent) {
    let mEvent = this.CommonEventBuilder(e);
    mEvent.CLICK_TYPE = CLICK_TYPE.DOUBLE;
    this.MouseEvenEmitting(mEvent);
  }
  public MouseDrag(e: MouseEvent) {
    this.click = false;
    this.prevent = true;
    let mEvent = this.CommonEventBuilder(e);
    mEvent.CLICK_TYPE = CLICK_TYPE.DRAG;
    mEvent.isDown = true;
    if (e.buttons === 1) {
      mEvent.CLICK_TYPE = CLICK_TYPE.DRAG;
    } else if (e.buttons === 4) {
      mEvent.CLICK_TYPE = CLICK_TYPE.DRAG_MIDDLE;
    } else if (e.buttons === 2) {
      mEvent.CLICK_TYPE = CLICK_TYPE.DRAG_RIGHT;
    }
    this.MouseEvenEmitting(mEvent);
  }
  public MouseMove(e: MouseEvent) {
    if (this.down) { this.MouseDrag(e); return; }
    let mEvent = this.CommonEventBuilder(e);
    mEvent.CLICK_TYPE = CLICK_TYPE.MOVE;
    mEvent.isDown = true;
    this.prevent = true;
    this.MouseEvenEmitting(mEvent);
  }
  public MouseUp(e: MouseEvent) {
    this.down = false;
    this.click = true;
    let mEvent = this.CommonEventBuilder(e);
    mEvent.CLICK_TYPE = CLICK_TYPE.UP;
    mEvent.isDown = false;
    this.MouseEvenEmitting(mEvent);
  }
  public MouseWheel(e: MouseEvent, v: number) {
    let mEvent = this.CommonEventBuilder(e);
    mEvent.wheel = v;
    mEvent.CLICK_TYPE = CLICK_TYPE.WHEEL;
    this.MouseEvenEmitting(mEvent);
  }
  public CommonEventBuilder(e: MouseEvent): MouseEventData {
    let mEvent: MouseEventData = new MouseEventData();
    mEvent.preXs = this.mouseEventDataPre.xs;
    mEvent.preYs = this.mouseEventDataPre.ys;
    mEvent.preX = this.mouseEventDataPre.x;
    mEvent.preY = this.mouseEventDataPre.y;
    // mEvent.premEvent = this.mouseEventDataPre;

    mEvent.pressedShift = e.shiftKey;
    mEvent.pressedAlt = e.altKey;
    mEvent.pressedCtrl = e.ctrlKey;

    mEvent.xs = e.offsetX;
    mEvent.ys = e.offsetY;
    mEvent.preWheel = this.mouseEventDataPre.wheel;
    mEvent.wheel = 0;
    mEvent.native = e;
    mEvent = this.ioWrapper.core.canvas.RemapByZoom(mEvent);
    this.mouseEventDataPre = mEvent;
    this.e = mEvent;
    return mEvent;
  }
  public get stopPropagation() {
    return this._stopPropagation;
  }
  public set stopPropagation(v: boolean) {
    if (v) {
      this._stopPropagation = v;
    } else {
      setTimeout(() => { this._stopPropagation = v; }, 500);
    }
  }
  private MouseEvenEmitting(mouseEventData: MouseEventData) {
    this.MouseEventEmittingForViewController(mouseEventData);
    if (this._stopPropagation) { return; }
    this.MouseEventEmittingForModel(mouseEventData);
  }
  private MouseEventEmittingForViewController(mouseEventData: MouseEventData) {
    if (this.mouseInteractionUI) { this.mouseInteractionUI.MouseInteractionMenu(mouseEventData); }
  }
  private MouseEventEmittingForModel(mouseEventData: MouseEventData) {
    this.ioWrapper.core.activeCommandController.MouseEventController(mouseEventData);
  }
}