import { Expression } from './expression';

abstract class MathFunction implements Expression {
    protected _child?: Expression;

    constructor(child?: Expression) {
        this._child = child;
    }

    public abstract calculate(...variable: number[]): number | number[] | undefined;
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