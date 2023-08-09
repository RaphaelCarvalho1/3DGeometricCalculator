import { Expression } from './expression';

export interface MathObject {
    dataFromObj(): number[];
    dataFromObj(minX: number, maxX: number, minY: number, maxY: number, stride: number): number[];
    dataFromObj(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number, stride: number): number[];

    value(...x: number[]): number | number[] | undefined;
}

class Point implements MathObject {
    private _coordinates: number[];

    constructor(x: number, y: number, z: number) {
        this._coordinates = [x, y, z];
    }

    public value(...x: number[]): number[] {
        return this._coordinates;
    }

    public dataFromObj(): number[] {
        return this._coordinates;
    }
}

class Vector implements MathObject {
    private _initialPoint: Point;
    private _terminalPoint: Point;

    constructor(initialPoint: Point, terminalPoint: Point) {
        this._initialPoint = initialPoint;
        this._terminalPoint = terminalPoint;
    }

    public value(...x: number[]): number[] {
        const initialArray = this._initialPoint.value();

        return this._terminalPoint.value().map((val, i)=>val - initialArray[i]);
    }

    public dataFromObj(): number[] {
        return [...this._initialPoint.dataFromObj(), ...this._terminalPoint.dataFromObj()];
    }
}

export class RealFunction implements MathObject {
    private _domainDimension: number;
    private _expression: Expression;

    constructor(domainDimension: number, expression: Expression) {
        this._domainDimension = domainDimension;
        this._expression = expression;
    }

    public value(...x: number[]): number {
        const entryDim = (typeof x === "number")? 1: x.length;

        if(this._domainDimension !== entryDim)
            throw new Error("The entry dimension needs to be "+this._domainDimension);

        const variables = (entryDim===1)? [x] : [...x as number[]];

        return eval(`var _a;
        (_a = this._expression).calculate.apply(_a, variables);`);
    }

    dataFromObj(minX?: number, maxX?: number, minY?: number, maxY?: number, stride?: number): number[] {
        return [1];
    }
}

class vecFuntion implements MathObject {
    private _counterDomainDimension: number;
    private _functions: RealFunction[];

    constructor(...functions: RealFunction[]) {
        this._counterDomainDimension = functions.length;

        this._functions = functions;
    }

    public value(...x: number[]): number[] {
        return this._functions.map(func => func.value(...x));   
    }

    public dataFromObj(): number[] {
        return [1];
    }
}

class Equation implements MathObject {
    private _isoValue: number;
    private _function: RealFunction;

    constructor(isoValue: number, realFunction: RealFunction) {
        this._isoValue = isoValue;
        this._function = realFunction;
    }

    value(...x: number[]): undefined {
        return undefined;
    }

    public dataFromObj(minX?: number, maxX?: number, minY?: number, maxY?: number, minZ?: number, maxZ?: number, stride?: number): number[] {
        return [1];
    }
}

