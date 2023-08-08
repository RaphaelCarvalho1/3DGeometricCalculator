import { Expression } from './math-object';
import { MathObject } from './math-object';

type mathObject = MathObject | number;

class MathGraph {
    private _nodesMap: Map<string, MathGraphNode> = new Map();

    public addNode(key: string, value: mathObject): void {
        this._nodesMap.set(key, new MathGraphNode(value));
    }

    public deleteNode(key: string){
        this._nodesMap.delete(key);
    }

    public addEdge(key1: string, key2: string){

    }

    public removeEdge(key1: string, key2: string){
        
    }

    public getNeighbors(key:string): Expression[] {
        
    }
}

class MathGraphNode {
    private _neighbors: string[] = [];
    private _object: mathObject;

    constructor(object: mathObject){
        this._object = object;
    }

    addNeighbor(key: string){
        this._neighbors.push(key);
    }
}

class MathObjManager {
    private _mathObjects: MathGraph = new MathGraph();

    public newObj(expression: string) {

    }
}
