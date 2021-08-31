export enum CLICK_TYPE {
    LEFT = 'LEFT', MIDDLE = 'MIDDLE', RIGHT = 'RIGHT', WHEEL = 'WHEEL',
    DRAG = 'DRAG', DRAG_LEFT = 'DRAG_LEFT', DRAG_MIDDLE = 'DRAG_MIDDLE', DRAG_RIGHT = 'DRAG_RIGHT',
    MOVE = 'MOVE', DOUBLE = 'DOUBLE', UP = 'UP',
    DOWN = 'DOWN', DOWN_MIDDLE = 'DOWN_MIDDLE', DOWN_RIGHT = 'DOWN_RIGHT'
}
export class ActiveCommandBase {
    constructor() { /*.*/ }
    public MouseEventController(e: any) {/*.*/ }
    public KeyboardEventController(k: any) {/*.*/ }
    public TouchEventController(t: any) {/*.*/ }
    public GestureEventController(j: any) {/*.*/ }
    public mouseLeftClick(e: any) {/*.*/ }
    public mouseMiddleClick(e: any) {/*.*/ }
    public mouseRightClick(e: any) {/*.*/ }
    public mouseDoubleClick(e: any) {/*.*/ }
    // .........................................
    public mouseMove(e: any) {/*.*/ }
    public mouseDrag(e: any) {/*.*/ }
    public mouseDown(e: any) {/*.*/ }
    public mouseUp(e: any) {/*.*/ }
    public keydown(k: any) {/*.*/ }
    public keyUp(k: any) {/*.*/ }
}
export class MouseEventData {
    x: number = -1; y: number = -1; z: number = -1;
    preX: number = -1; preY: number = -1; preZ: number = -1;
    xs: number = -1; ys: number = -1;
    preXs: number = -1; preYs: number = -1;
    yGLPicking: number;
    command: ActiveCommandBase; // = new CActiveCommandNone(this.app.activeCommands);
    CLICK_TYPE: CLICK_TYPE = CLICK_TYPE.MOVE;
    isDown: boolean = false;
    isDoubleClick: boolean = false;
    isMove: boolean = false;
    pressedShift: boolean = false;
    pressedAlt: boolean = false;
    pressedCtrl: boolean = false;
    wheel: number = 0;
    preWheel: number = 0;
    isActive: boolean = true;
    // premEvent: MouseEventData;
    native: MouseEvent;
    constructor() {
        //
    }
    public DeepCopy() {
        let mEvent = new MouseEventData();
        mEvent.x = this.x; mEvent.y = this.y; mEvent.z = this.z;
        mEvent.preX = this.preX; mEvent.preY = this.preY; mEvent.preZ = this.preZ;
        mEvent.xs = this.x; mEvent.ys = this.y;
        mEvent.preXs = this.preXs; mEvent.preYs = this.preYs;
        mEvent.pressedAlt = this.pressedAlt; mEvent.pressedShift = this.pressedShift; mEvent.pressedCtrl = this.pressedCtrl;
        mEvent.isDoubleClick = this.isDoubleClick; mEvent.isDown = this.isDown; mEvent.isMove = this.isMove;
        mEvent.wheel = this.wheel; mEvent.preWheel = this.preWheel;
        mEvent.yGLPicking = this.yGLPicking;
        mEvent.CLICK_TYPE = this.CLICK_TYPE;
        mEvent.command = this.command;
        mEvent.native = this.native;
        return mEvent;
    }
}
export class NVector3 {
    public static origin: NVector3 = new NVector3(0, 0, 0);
    public x: number = 0.0;
    public y: number = 0.0;
    public z: number = 0.0;
    public d: {} = {};
    isModified: boolean = false;
    public static Distance(v0: NVector3, v1: NVector3): number {
        return Math.sqrt((v0.x - v1.x) * (v0.x - v1.x) + (v0.y - v1.y) * (v0.y - v1.y) + (v0.z - v1.z) * (v0.z - v1.z));

    }
    public static DistanceByArray(v0: number[], v1: number[]): number {
        return Math.sqrt((v0[0] - v1[0]) * (v0[0] - v1[0]) + (v0[1] - v1[1]) * (v0[1] - v1[1]) + (v0[2] - v1[2]) * (v0[2] - v1[2]));
    }
    constructor(x: number, y: number, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
export const LineByVecs = (ctx: CanvasRenderingContext2D, v0: NVector3, v1: NVector3, width: number = 1, fill: string = '#ff0000') => {
    ctx.strokeStyle = fill;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(v0.x, v0.y);
    ctx.lineTo(v1.x, v1.y);
    ctx.closePath();
    ctx.stroke();
};
export const Line = (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, width: number = 1, fill: string = '#ff0000') => {
    ctx.strokeStyle = fill;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.stroke();
};
export const GridLineOrigin = (ctx: CanvasRenderingContext2D, xNum: number = 10, yNum: number = 10, xOff: number = 20, yOff: number = 20) => {
    const xStart = - ((xNum * xOff) * 0.5);
    const yStart = - ((yNum * yOff) * 0.5);
    ctx.lineWidth = 0.1;
    for (let y = 0; y <= yNum; ++y) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart + (yOff * y));
        ctx.lineTo((xNum * xOff) * 0.5, yStart + (yOff * y));
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xStart + (xOff * y), yStart);
        ctx.lineTo(yStart + (yOff * y), (yNum * yOff) * 0.5);
        ctx.closePath();
        ctx.stroke();
    }

};