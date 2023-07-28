console.log("hello world!");

class Class{
    private value: number;

    constructor(value: number){
        this.value = value;
    }

    sayValue(){
        console.log("My value is " + this.value);
    }
}

const teste = new Class(12);

teste.sayValue();
