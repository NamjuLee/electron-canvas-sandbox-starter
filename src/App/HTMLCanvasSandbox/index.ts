import { Core } from './Core';
import { Implmentations } from './Implmentations';
export class HTMLCanvasSandbox {
    public id: string;
    public core: Core;
    public implmentations: Implmentations;
    public hostDiv: HTMLElement;
    public div: HTMLElement;
    static Init(id: string = 'SandBox') {
        new HTMLCanvasSandbox(id);
    }
    constructor(id: string = 'SandBox') {
        this.id = id;
        this.Init();
        this.InitPost();
    }
    private Init() {
        const hostdiv = document.getElementById(this.id);
        if (hostdiv) { this.hostDiv = hostdiv; } else { return; }

        const div = document.createElement('div');
        if (div) {
            this.div = div;
            this.div.style.width = '600px';
            this.div.style.height = '600px';
            this.div.style.background = '#dddddd';
            this.hostDiv.append(this.div);
        }

        this.core = new Core(this, div);
        this.implmentations = new Implmentations(this, 1);
        this.InitEvent();
    }
    private InitEvent() {
        window.onresize = (e: Event) => {
            //
            this.core.canvas.Resize();
        };
    }
    private InitPost() {
        this.core.InitPost();
        this.core.canvas.Render = (ctx: CanvasRenderingContext2D) => this.implmentations.Render(ctx);
    }
}