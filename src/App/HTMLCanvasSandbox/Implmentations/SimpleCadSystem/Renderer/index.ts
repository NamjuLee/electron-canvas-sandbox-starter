import { GridLineOrigin } from '../../../../lib';
import { ActiveCommandController } from '../ActiveCommandController/ActiveCommandController';
import { SimpleCadSystem } from '..';
export class Renderer {
    public implementation: SimpleCadSystem;
    public activeCommandController: ActiveCommandController;
    public t: number = 0.0;
    constructor(implementation: SimpleCadSystem) {
        this.implementation = implementation;
    }
    public OnRender(ctx: CanvasRenderingContext2D) {
        this.Update(ctx);
        this.Render(ctx);
    }
    public Update(ctx: CanvasRenderingContext2D) {

    }
    public Render(ctx: CanvasRenderingContext2D) {
        GridLineOrigin(ctx);

        for (let i = 0; i < this.implementation.scene.listPoint.length; ++i) {
            this.implementation.scene.listPoint[i].Render(ctx);
        }

        this.t += 0.1;
    }
}