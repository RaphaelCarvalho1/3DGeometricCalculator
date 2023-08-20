import { MathObject } from './math-object';

export type mathObject = MathObject | number;

class MathGraph {
    private _nodesMap: Map<string, MathGraphNode> = new Map();

    public getGraphNode(key: string) : MathGraphNode {
        return this._nodesMap.get(key)!;
    }

    public addNode(key: string, value: mathObject): void {
        this._nodesMap.set(key, new MathGraphNode(value));
    }

    public deleteNode(key: string) {
        const node = this._nodesMap.get(key);
        
        for(let neighbor of node!.neighbors) 
            this._nodesMap.delete(neighbor);

        this._nodesMap.delete(key);
    }

    public addEdge(key1: string, key2: string): void {
        const node = this._nodesMap.get(key1);
        node!.addNeighbor(key2);
    }

    public contains(key: string){
        return this._nodesMap.has(key);
    }
}

class MathGraphNode {
    private _neighbors: string[] = [];
    private _object: mathObject;

    constructor(object: mathObject){
        this._object = object;
    }

    public get neighbors(): string[] {
        return this._neighbors;
    }

    public get object(): mathObject {
        return this._object;
    }

    addNeighbor(key: string) {
        this._neighbors.push(key);
    }
}

class MathObjManager {
    private _mathObjects: MathGraph = new MathGraph();

    private static _instance: MathObjManager = new MathObjManager();

    public static get instance(){
        return this._instance;
    }

    public newObj(expression: string) {
        //usar parser
    }

    public getMathObject(key: string): mathObject {
        const node = this._mathObjects.getGraphNode(key);
        return node.object;
    }

    public exists(key: string): boolean{
        return this._mathObjects.contains(key);
    }
}

export let mathObjManager = (() => MathObjManager.instance)();