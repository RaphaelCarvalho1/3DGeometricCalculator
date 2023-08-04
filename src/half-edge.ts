class Vertex {
    private _id: number;
    private _position: number[];
    private _normal: number[];
    private _he?: HalfEdge;

    constructor(id: number, position: number[], normal: number[]) {
        this._id = id;
        this._position = position;
        this._normal = normal;
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

    public get normal(): number[] {
        return this._normal;
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

    public set opposite(opposite: HalfEdge) {
        this._opposite = opposite;
    }
}

export class HalfEdgeDS {
    private _halfEdges?: HalfEdge[];
    private _vertices?: Vertex[];
    private _faces?: Face[];

    public get coords(): number[] {
        let coords = [];

        for(let vertex of this._vertices!) {
            coords.push(...vertex.position);
        }

        return coords;
    }

    public get indices(): number[] {
        let indices = [];

        for(let he of this._halfEdges!) {
            indices.push(he.vertex.id);
        }

        return indices;
    }

    public get normals(): number[] {
        let normals = [];

        for(let vertex of this._vertices!) {
            normals.push(...vertex.normal);
        }

        return normals;
    }

    public build(coords: number[], indices: number[], normals: number[]) {
        for(let i=0; i<coords.length; i+=4) {
            const id = i/4;
            const position = coords.slice(i, i+4);
            const normal = normals.slice(i, i+4);

            this._vertices?.push(new Vertex(id, position, normal));
        }

        for(let i=0; i<indices.length; i++) {
            let he = [];

            for (let j=0; j<3; j++) {
                const vertex = this._vertices![indices [i + j]];
                he.push(new HalfEdge(vertex));
            }

            const face = new Face(he[0]);
            this._faces?.push(face);

            for(let j=0; j<3; j++) {
                he[i].face = face;
                he[i].next = he[(i+1)%3];
                this._halfEdges?.push(he[i]);
            }
        }

        this.computeOpposites();
    }

    private computeOpposites(): void {
        const visitedHEs: Map<string, HalfEdge> = new Map();

        for(let he of this._halfEdges!) {
            const initialVertex = he.vertex;
            const finalVertex = he.next.vertex;

            const heKey = `${Math.min(initialVertex.id, finalVertex.id)},${Math.max(initialVertex.id, finalVertex.id)}`;

            if(!initialVertex.he) initialVertex.he = he;

            if(visitedHEs.has(heKey)) {
                const op = visitedHEs.get(heKey)!;
                op.opposite = he;
                he.opposite = op;

                visitedHEs.delete(heKey);
            } else {
                visitedHEs.set(heKey, he);
            }
        }
    }
}