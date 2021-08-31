import { MouseEventData, NVector3 } from '../../../lib';
import { Implmentations, IImplmentation } from '..';
export class Playground implements IImplmentation {
    public implmentations: Implmentations;
    public t: number = 0;
    public m: number[] = [0, 0, 0];
    constructor(implmentations: Implmentations) {
        this.implmentations = implmentations;
        this.Init();
    }
    private Init() {
        // TODO
    }
    public MouseEventController(e: MouseEventData) {
        this.m[0] = e.x;
        this.m[1] = e.y;
    }
    public Render(ctx: CanvasRenderingContext2D) {
        const xNum: number = 20;
        const yNum: number = 20;
        const xOff: number = 20;
        const yOff: number = 20;
        const xStart = - ((xNum * xOff) * 0.5);
        const yStart = - ((yNum * yOff) * 0.5);

        ctx.lineWidth = 0.1;
        for (let y = 0; y <= yNum; ++y) {
            for (let x = 0; x <= xNum; ++x) {
                const ani = Math.cos(this.t + x) * 5;
                const xPos = ani + xStart + (xOff * x);
                const yPos = yStart + (yOff * y);
                const dis = NVector3.DistanceByArray(this.m, [xPos, yPos, 0]);

                ctx.beginPath();
                ctx.arc(xPos, yPos, 10 * (dis * 0.001), 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.m[0], this.m[1], 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        this.t += 0.1;
    }
}