interface Operation {
    calculate(): number;
}

interface MathFunction {
    calculate(): number;
}

class Polynomial implements MathFunction {
    private _coefficients: number[];

    constructor(coefficients: number[]) {
        this._coefficients = coefficients;
    }

    calculate(): number {
        return;
    }
}

class Exponential implements MathFunction {
    calculate(): number {
        return;
    }
}

class Logarithm implements MathFunction {
    calculate(): number {
        return;
    }
}

class Sin implements MathFunction {
    calculate(): number {
        return;
    }
}

class Cos implements MathFunction {
    public calculate(): number {
        return;
    }
}

class Tan implements MathFunction {
    public calculate(): number {
        return;
    }
}