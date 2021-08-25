import { IsNotEmpty } from "class-validator";
import { birthToAge } from "../helpers/age";

export class Person {
    @IsNotEmpty()
    public id: number;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public birthYear: string;

    @IsNotEmpty()
    public url: string;

    @IsNotEmpty()
    public age: number;

    public toString(): string {
        return `${this.name}`;
    }

    constructor(
        id: number,
        name: string = 'noname',
        birthYear: string,
        url: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
        this.url = url;
        this.age = birthToAge(birthYear);
    }


}
