import { HTMLCanvasSandbox } from '..';
import { Canvas } from './Canvas/Canvas';
import { IOWrapper } from './IOWrapper';
import { ActiveCommandController } from './ActiveCommandController/ActiveCommandController';
export class Core {
    public sandbox: HTMLCanvasSandbox;
    public canvas: Canvas;
    public ioWrapper: IOWrapper;
    public activeCommandController: ActiveCommandController;
    constructor(sandbox: HTMLCanvasSandbox, div: HTMLElement) {
        this.sandbox = sandbox;
        this.InitPulldown();
        this.InitCanvas(div);
        this.activeCommandController = new ActiveCommandController(this);
        this.ioWrapper = new IOWrapper(this);
    }
    private InitCanvas(div: HTMLElement) {
        this.canvas = new Canvas(this, div);
    }
    private InitPulldown() {
        // TODO:
    }
    public InitPost() {
        this.ioWrapper.InitEventListener(this.sandbox.div as HTMLDivElement);
    }
}