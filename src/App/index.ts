import { version } from '@tensorflow/tfjs';
import { HTMLCanvasSandbox as HTMLCanvasSandboxV1 } from './HTMLCanvasSandbox';
export class App {
    public id: string;
    public sandBox: HTMLCanvasSandboxV1;
    public hostDiv: HTMLElement;
    public div: HTMLElement;
    public version: number = 1;
    static Init(id: string = 'SandBox') {
        new App(id, 1);
    }
    constructor(id: string = 'SandBox', version: number = 1) {
        this.id = id;
        this.version = version;
        this.Init();
    }
    private Init() {
        switch (this.version) {
            case 1:
                this.sandBox = new HTMLCanvasSandboxV1(this.id);
                break;
        }
        console.log('TensorfowJS Version : ', version);
    }
}