import { Core } from '../../Core';
import { MouseInteraction } from './EventInteraction/MouseInteraction';
export class IOWrapper {
    public core: Core;
    public mouseInteraction: MouseInteraction;
    constructor(core: Core) {
        this.core = core;

        this.mouseInteraction = new MouseInteraction(this);
    }
    public InitEventListener(div: HTMLDivElement) {
        this.mouseInteraction.InitNativeMouseEvent(div);
        this.Resize();
    }
    private Resize() {
        window.addEventListener('resize', (e: UIEvent) => this.ReSizeWindow(e));

    }
    // tslint:disable-next-line:no-any
    ReSizeWindow(e: any) {
        // TODO:
    }
}