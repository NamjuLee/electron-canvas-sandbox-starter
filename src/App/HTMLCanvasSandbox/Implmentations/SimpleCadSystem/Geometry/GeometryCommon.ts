import { NVector3 } from '../../../../lib';
import { SimpleCadSystem } from '..';
export class GeometryCommon {
    public simpleCadSystem: SimpleCadSystem;
    constructor(simpleCadSystem: SimpleCadSystem) {
        this.simpleCadSystem = simpleCadSystem;
    }
    public Pick(v: NVector3) {
        for (let i = 0; i < this.simpleCadSystem.scene.listPoint.length; ++i) {
            if (this.simpleCadSystem.scene.listPoint[i].IsInside(v)) {
                return this.simpleCadSystem.scene.listPoint[i];
            }
        }
        return undefined;
    }
    public UpdateHover(v: NVector3) {
        for (let i = 0; i < this.simpleCadSystem.scene.listPoint.length; ++i) {
            this.simpleCadSystem.scene.listPoint[i].IsInside(v);
        }
    }
}