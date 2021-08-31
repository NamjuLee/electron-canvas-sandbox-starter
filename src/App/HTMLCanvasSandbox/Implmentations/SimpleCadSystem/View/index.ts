import { SimpleCadSystem } from '..';
export class View {
    public simpleCadSystem: SimpleCadSystem;
    public divHost: HTMLElement;
    public div: HTMLElement;
    constructor(simpleCadSystem: SimpleCadSystem) {
        this.simpleCadSystem = simpleCadSystem;
        this.divHost = simpleCadSystem.implmentations.sandbox.hostDiv;

        const div = document.createElement('div');
        if (div) {
            this.div = div;
            this.divHost.insertBefore(this.div, simpleCadSystem.implmentations.sandbox.div);
            this.Init();
        }
    }
    public Init() {
        let div = document.createElement('button');
        div.type = 'button';
        div.innerText = 'select';
        div.onclick = () => { console.log('sel'); };
        this.div.append(div);

        div = document.createElement('button');
        div.type = 'button';
        div.innerText = 'point';
        div.onclick = () => { console.log('point'); };
        this.div.append(div);
    }
}