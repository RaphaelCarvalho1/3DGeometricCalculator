import { mathObjManager } from './math-graph';

export interface Expression {
    calculate(...variable: number[]): number | number[] | undefined;
}


export class Scalar implements Expression {

    private _scalar: number;

    constructor(scalar: number) {
        this._scalar = scalar;
    }

    public calculate(...variable: number[]): number {
        return this._scalar;
    }

}

export class Vec implements Expression {

    private _vec: number[];

    constructor(vec: number[]){
        this._vec = vec;
    }

    public calculate(...variable: number[]): number[] {
        return this._vec;
    }

}

export class Variable implements Expression {
    
    private _varIndex: number;

    constructor(varIndex: number) {
        this._varIndex = varIndex;
    }

    public calculate(...variable: number[]): number {

        if(this._varIndex>= variable.length)
            return 6;

        return variable[this._varIndex];
    }
}

export class Reference implements Expression {
    private _key: string;
    
    constructor(key: string) {
        this._key = key;
    }

    public calculate(...variable: number[]) {
        const obj = mathObjManager.getMathObject(this._key);

        if(typeof obj === "number")
            return obj;

        const result = obj.value(...variable);

        return result;
    }
}