import { mathObjManager } from './math-graph';
import { Expression } from './math-object';

abstract class MathFunction implements Expression {
    protected _child?: Expression;

    constructor(child?: Expression) {
        this._child = child;
    }

    public abstract calculate(...variable: number[]): number | number[] | undefined;
}

export class Scalar extends MathFunction{

    private _scalar: number;

    constructor(scalar: number){
        super();

        this._scalar = scalar;
    }

    public calculate(...variable: number[]): number {
        return this._scalar;
    }

}

export class Vec extends MathFunction{

    private _vec: number[];

    constructor(vec: number[]){
        super();

        this._vec = vec;
    }

    public calculate(...variable: number[]): number[]{
        return this._vec;
    }

}

export class Variable extends MathFunction {
    
    private _varIndex: number;

    constructor(varIndex: number) {
        super();

        this._varIndex = varIndex;
    }

    public calculate(...variable: number[]) {

        if(this._varIndex>= variable.length)
            return;

        return variable[this._varIndex];
    }
}

export class Exponential extends MathFunction {
    private _base: number;

    constructor(child: Expression, base: number) {
        super(child);

        this._base = base;
    }

    public calculate(...variable: number[]) {
        const childValue = eval(`var _a;
            (_a = this._child).calculate.apply(_a, variable);`);

        if(!childValue) return childValue;

        return this._base**childValue;
    }
}

export class Logarithm extends MathFunction {
    private base: number;

    constructor(child: Expression, base: number) {
        super(child);

        this.base = base;
    }

    public calculate(...variable: number[]) {
        const childValue = eval(`var _a;
            (_a = this._child).calculate.apply(_a, variable);`);

        if(!childValue) return childValue;

        return Math.log10(childValue) / Math.log10(this.base);
    }
}

export class Sin extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(...variable: number[]) {
        const childValue = eval(`var _a;
            (_a = this._child).calculate.apply(_a, variable);`);

        if(!childValue) return childValue;

        return Math.sin(childValue);
    }
}

export class Cos extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(...variable: number[]) {
        const childValue = eval(`var _a;
            (_a = this._child).calculate.apply(_a, variable);`);

        if(!childValue) return childValue;

        return Math.cos(childValue);
    }
}

export class Tan extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(...variable: number[]) {
        const childValue = eval(`var _a;
            (_a = this._child).calculate.apply(_a, variable);`);

        if(!childValue) return childValue;

        return Math.tan(childValue);
    }
}

export class Module extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(...variable: number[]) {
        const childValue = eval(`var _a;
            (_a = this._child).calculate.apply(_a, variable);`);

        if(!childValue) return childValue;

        return Math.abs(childValue);
    }
}

export class Reference extends MathFunction{
    private key: string;
    
    constructor(key: string){
        super();

        this.key = key;
    }

    public calculate(...variable: number[]): number | number[] | undefined {
        const obj = mathObjManager.getMathObject(this.key);

        if(typeof obj === "number")
            return obj;

        const result = obj.value(...variable);

        return result;
    }
}