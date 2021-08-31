import { MouseEventData } from '../../../lib';
import { Implmentations, IImplmentation } from '..';
import { Renderer } from './Renderer';
import { GeometryCommon } from './Geometry/GeometryCommon';
import { View } from './View';
import { Scene } from './Scene';
import { ActiveCommandController } from './ActiveCommandController/ActiveCommandController';
export class SimpleCadSystem implements IImplmentation {
    public implmentations: Implmentations;
    public renderer: Renderer;
    public geometryCommon: GeometryCommon;
    public view: View;
    public scene: Scene;
    public activeCommandController: ActiveCommandController;
    constructor(implmentations: Implmentations) {
        this.implmentations = implmentations;
        this.Init();
    }
    private Init() {
        this.activeCommandController = new ActiveCommandController(this);
        this.geometryCommon = new GeometryCommon(this);
        this.scene = new Scene(this);
        this.renderer = new Renderer(this);
        this.view = new View(this);
    }
    public MouseEventController(e: MouseEventData) {
        this.activeCommandController.MouseEventController(e);
    }
    public Render(ctx: CanvasRenderingContext2D) {
        this.renderer.OnRender(ctx);
    }
}