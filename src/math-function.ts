import { Expression } from './math-object';

abstract class MathFunction implements Expression {
    protected _child: Expression;

    constructor(child: Expression) {
        this._child = child;
    }

    public abstract calculate(varible: number | number[]): number;
}

class Polynomial extends MathFunction {
    private _coefficients: number[];

    constructor(child: Expression, coefficients: number[]) {
        super(child);
        this._coefficients = coefficients;
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Exponential extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Logarithm extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Pow extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Sin extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Cos extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Module extends MathFunction {
    constructor(child: Expression) {
        super(child);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}