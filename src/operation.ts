import { Expression } from './math-object';

abstract class Operation implements Expression {
    protected _operands: Expression[];

    constructor(operands: Expression[]) {
        this._operands = operands;
    }

    public abstract calculate(varible: number | number[]): number;
}

class Sum extends Operation {
    constructor(operands: Expression[]) {
        super(operands);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Subtraction extends Operation {
    constructor(operands: Expression[]) {
        super(operands);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Division extends Operation {
    constructor(operands: Expression[]) {
        super(operands);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}

class Multiplicatioin extends Operation {
    constructor(operands: Expression[]) {
        super(operands);
    }

    public calculate(varible: number | number[]): number {
        return 6;
    }
}