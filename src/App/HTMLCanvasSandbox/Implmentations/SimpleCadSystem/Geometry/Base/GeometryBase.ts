import { NVector3, MouseEventData } from '../../../../../lib';
import { Scene } from '../../Scene';

// https://www.typescriptlang.org/docs/handbook/classes.html

export abstract class GeometryBase {
    public isHover: boolean = false;
    public scene: Scene;
    constructor(scene: Scene) {
        this.scene = scene;
    }
    public RenderPre(ctx: CanvasRenderingContext2D) {
        this.Render(ctx);
    }
    public Translation(e: MouseEventData) {
        // implementation needed
    }
    abstract Render(ctx: CanvasRenderingContext2D): void;
    abstract IsInside(v: NVector3): boolean;
}