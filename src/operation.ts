import { Expression } from './math-object';

abstract class Operation implements Expression {
    protected _operand1: Expression;
    protected _operand2: Expression;

    constructor(operand1: Expression, operand2: Expression) {
        this._operand1 = operand1;
        this._operand2 = operand2;
    }

    public abstract calculate(...variable: number[]): number | undefined;
}

export class Sum extends Operation {
    constructor(operand1: Expression, operand2: Expression) {
        super(operand1, operand2);
    }

    public calculate(...variable: number[]) {
        const result1 = eval(`var _a;
            (_a = this._operand1).calculate.apply(_a, variable);`);
        const result2 = eval(`var _a;
            (_a = this._operand2).calculate.apply(_a, variable);`);
        return result1 + result2;
    }
}

export class Subtraction extends Operation {
    constructor(operand1: Expression, operand2: Expression) {
        super(operand1, operand2);
    }

    public calculate(...variable: number[]) {
        const result1 = eval(`var _a;
            (_a = this._operand1).calculate.apply(_a, variable);`);
        const result2 = eval(`var _a;
            (_a = this._operand2).calculate.apply(_a, variable);`);
        return result1 - result2;
    }
}

export class Division extends Operation {
    constructor(operand1: Expression, operand2: Expression) {
        super(operand1, operand2);
    }

    public calculate(...variable: number[]) {
        const result2 = eval(`var _a;
            (_a = this._operand2).calculate.apply(_a, variable);`);
        
        if(result2 === 0) return undefined;

        const result1 = eval(`var _a;
            (_a = this._operand1).calculate.apply(_a, variable);`);
        
            return result1 / result2;
    }
}

export class Multiplication extends Operation {
    constructor(operand1: Expression, operand2: Expression) {
        super(operand1, operand2);
    }

    public calculate(...variable: number[]) {
        const result1 = eval(`var _a;
            (_a = this._operand1).calculate.apply(_a, variable);`);
        const result2 = eval(`var _a;
            (_a = this._operand2).calculate.apply(_a, variable);`);
        return result1 * result2;
    }
}

export class Pow extends Operation {
    constructor(operand1: Expression, operand2: Expression) {
        super(operand1, operand2);
    }

    public calculate(...variable: number[]) {
        const result1 = eval(`var _a;
            (_a = this._operand1).calculate.apply(_a, variable);`);
        const result2 = eval(`var _a;
            (_a = this._operand2).calculate.apply(_a, variable);`);
        return result1 ** result2;
    }
}