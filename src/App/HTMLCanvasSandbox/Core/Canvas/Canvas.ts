import { MouseEventData } from '../../../lib';
import { Core } from '../../Core';
export class Canvas {
    public core: Core;
    public div: HTMLElement;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public isActive: boolean = false;
    public zoom: number = 1;
    public translation: number[] = [0, 0];
    public log: string;
    public isViewChanging: boolean = false;
    public loopNum: number = 0;
    public needRenderloop: boolean = true;
    public ablePan: boolean = true;
    public pause: boolean = false;
    constructor(core: Core, div: HTMLElement) {
        this.core = core;
        this.div = div;
        this.Init();
        this.LoopInit();
    }
    private Init() {
        const canvas = document.createElement('canvas');
        if (canvas) {
            this.canvas = canvas;
            this.canvas.width = this.div.clientWidth;
            this.canvas.height = this.div.clientHeight;
            this.div.append(this.canvas);
            const ctx = this.canvas.getContext('2d');
            if (ctx) {
                this.ctx = ctx;
                this.isActive = true;
            }
        }
    }
    private LoopInit() {
        this.translation[0] = this.ctx.canvas.width * 0.5;
        this.translation[1] = this.ctx.canvas.height * 0.5;

        this.Loop();
    }
    public Resize() {
        this.canvas.width = this.div.clientWidth;
        this.canvas.height = this.div.clientHeight;
    }
    public Loop() {
        requestAnimationFrame(() => { this.Loop(); });
        let before = performance.now();
        this.RenderPre(this.ctx);

        let after = performance.now();
        this.log = `level: , total frames: ${this.loopNum++} (FPS: ), a loop took: ${(after - before).toFixed(2)} ms to execute.`;
    }
    public Clear(ctx: CanvasRenderingContext2D) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }
    public Zoom(e: MouseEventData) {
        if (e.wheel < 0) {
            this.core.canvas.zoom += this.core.canvas.zoom * 0.09;
        } else {
            this.core.canvas.zoom -= this.core.canvas.zoom * 0.09;
        }
    }
    public RemapByZoom(e: MouseEventData) {
        e.x = (e.xs - this.translation[0]) / this.zoom;
        e.y = (e.ys - this.translation[1]) / this.zoom;
        return e;
    }
    public Pan(e: MouseEventData) {
        if (!this.ablePan) { return; }
        const xOff = e.xs - e.preXs;
        const yOff = e.ys - e.preYs;
        this.core.canvas.translation[0] += xOff;
        this.core.canvas.translation[1] += yOff;
    }
    public RenderForce() {
        //
    }
    public RenderPre(ctx: CanvasRenderingContext2D) {
        if (!this.isActive) { return; }
        this.Clear(this.ctx);
        this.ctx.save();
        this.ctx.translate(this.translation[0], this.translation[1]);
        this.ctx.scale(this.zoom, this.zoom);

        this.Render(ctx);

        this.ctx.restore();
    }
    public Render(ctx: CanvasRenderingContext2D) {
        // TODO: binding needed
    }
}