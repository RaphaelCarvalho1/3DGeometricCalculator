/*import { Mesh } from './mesh';

interface MathObject {
    meshFromObj(): Mesh;
}

class Equation {
    private _isoValue: number;
    private _function: RealFunction;

    constructor(isoValue: number, realFunction: RealFunction) {
        this._isoValue = isoValue;
        this._function = realFunction;
    }

    public meshFromObj(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number, stride: number): Mesh {
        return;
    }
}

class Point {
    private _coordinates: number[];

    constructor(x: number, y: number, z: number) {
        this._coordinates = [x, y, z];
    }

    public meshFromObj(): Mesh {
        return;
    }
}

class Vector {
    private _initialPoint: Point;
    private _terminalPoint: Point;

    constructor(initialPoint: Point, terminalPoint: Point) {
        this._initialPoint = initialPoint;
        this._terminalPoint = terminalPoint;
    }

    public meshFromObj(): Mesh {
        return;
    }
}

class Constant {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public meshFromObj(): Mesh {
        return;
    }
}

class RealFunction implements MathObject {
    private _domainDimension: number;

    constructor(domainDimension: number) {
        this._domainDimension = domainDimension;
    }

    public value(x: number | number[]): number {
        return 6;
    }

    public meshFromObj(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number, stride: number): Mesh {
        return;
    }
}

class vecFuntion implements MathObject {
    private _counterDomainDimension: number;

    constructor(counterDomainDimension: number) {
        this._counterDomainDimension = counterDomainDimension;
    }

    public value(x: number | number[]): number[] {
        return [6]; 
    }

    public meshFromObj(): Mesh {
        return;
    }
}

*/

export interface Expression {
    calculate(varible: number | number[]): number | undefined;
}



