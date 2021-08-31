import { SimpleCadSystem } from '..';
import { NPoint } from '../Geometry/NPoint';
export class Scene {
    public implementation: SimpleCadSystem;
    public listPoint: NPoint[] = [];
    constructor(implementation: SimpleCadSystem) {
        this.implementation = implementation;
    }
}