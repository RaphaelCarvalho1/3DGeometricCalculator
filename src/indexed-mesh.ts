import { Mesh } from './mesh';
import { HalfEdgeDS } from './half-edge';

export abstract class IndexedMesh extends Mesh {
    protected _heds: HalfEdgeDS = new HalfEdgeDS();

    protected createVAO() {
        
    }

    public draw() {
        
    }
}