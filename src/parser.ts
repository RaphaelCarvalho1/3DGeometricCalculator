import { mathObject } from './math-graph';

export class Parser {

    private static operators = ["+", "-", "*", "^", "/", ""]

    private static isNumeric(char: string){
        return (char >= "0" && char <= "9")
    }

    private static isLetter(char: string){
        char = char.toLowerCase();

        return (char >= "a" && char <= "z")
    }

    public static split(expression: string){
        const splitted: (string | number)[] = [];

        let level = 0; 

        let word = false;

        for(let i = 0; i < expression.length; i++){
            const char = expression[i];

            if(char === "(" || char === ")" || char === "_" || char === " " || 
            this.operators.indexOf(char) !== -1){
                splitted.push(char);

                if(char === "(")
                    level++;
                else if(char === ")")
                    level--;
            }

            else if(Parser.isNumeric(char)){
            
                if(typeof splitted[splitted.length - 1] === "number"){
                    let value = splitted[splitted.length - 1] as number;
                    value *= 10
                    value += Number(char);
                    splitted[splitted.length - 1] = value;
                }else
                    splitted.push(Number(char))
            }

            else if(Parser.isLetter(char)){
                if(typeof splitted[splitted.length - 1] === "string" &&
                    Parser.isLetter(splitted[splitted.length - 1] as string)){
                        splitted[splitted.length - 1] += char;
                }

                else splitted.push(char);
            }
                    
        }

        return splitted;
    }

    public static validate(expression: (number | string)[]){

    }

    public static parse(expression: string): mathObject {
        return 1;
    }
}