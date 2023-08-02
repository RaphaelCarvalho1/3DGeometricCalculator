class Vertex {
    private _id: number;
    private _position: number[];
    private _he?: HalfEdge;

    constructor(id: number, position: number[]) {
        this._id = id;
        this._position = position;
    }

    public get id(): number {
        return this._id;
    }

    public get position(): number[] {
        return this._position;
    }

    public get he(): HalfEdge {
        return this._he!;
    }

    public set he(he: HalfEdge) {
        this._he = he;
    }
}

class Face {
    private baseHe: HalfEdge;

    constructor(baseHe: HalfEdge) {
        this.baseHe = baseHe;
    }
}

class HalfEdge {
    private _vertex: Vertex;
    private _face?: Face;
    private _next?: HalfEdge;
    private _opposite?: HalfEdge;

    constructor(vertex: Vertex) {
        this._vertex = vertex;
    }

    public get next(): HalfEdge {
        return this._next!;
    }

    public get vertex(): Vertex {
        return this._vertex;
    }

    public get opposite(): HalfEdge {
        return this._opposite!;
    }

    public set next(next: HalfEdge) {
        this._next = next;
    }

    public set face(face: Face) {
        this._face = face;
    }
}

export class HalfEdgeDS {
    private _halfEdges?: Array<HalfEdge>;
    private _vertices?: Array<Vertex>;
    private _faces?: Array<Face>;

    public build(coords: Array<number>, indices: Array<number>) {

    }

    private computeOpposites(): void {

    }

    private computeVertexHe(): void {
        
    }
}