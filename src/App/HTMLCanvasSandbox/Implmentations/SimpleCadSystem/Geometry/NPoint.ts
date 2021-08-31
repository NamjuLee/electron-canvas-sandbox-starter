import { GeometryBase } from './Base/GeometryBase';
import { Scene } from '../Scene';
import { NVector3, MouseEventData } from '../../../../lib';
export class NPoint extends GeometryBase {
    public v: NVector3;
    public r: number = 3;
    public fillStyle: string = '#ff0000';
    public fillStyleHover: string = '#00ff00';
    constructor(scene: Scene, x: number, y: number, z: number = 0) {
        super(scene);
        this.v = new NVector3(x, y, z);

        this.scene.listPoint.push(this);
    }
    public Translation(e: MouseEventData) {
        this.v.x += e.x - e.preX;
        this.v.y += e.y - e.preY;
    }
    public IsInside(v: NVector3): boolean {
        if (NVector3.Distance(this.v, v) < this.r) {
            this.isHover = true;
            return true;
        } else {
            this.isHover = false;
            return false;
        }
    }
    public Render(ctx: CanvasRenderingContext2D): void {

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

        if (this.isHover) {
            ctx.fillStyle = this.fillStyle;
        } else {
            ctx.fillStyle = this.fillStyleHover;
        }
        ctx.beginPath();
        ctx.arc(this.v.x, this.v.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        if (this.isHover) {
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }
}