// import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Get, JsonController, OnUndefined, Param, QueryParam } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { PersonNotFoundError } from '../errors/PersonNotFoundError';
import { Person } from '../models/Person';
import { PersonService } from '../services/PersonService';

export class PersonProfileResponse {
    public name: string;
    public birth_year: string;
    public height: string;
    public mass: string;
    public hair_color: string;
    public skin_color: string;
    public eye_color: string;
    public gender: string;
    public homeworld: string;

    constructor(data) {
        this.name = data.name;
        this.birth_year = data.birth_year;
        this.height = data.height;
        this.mass = data.mass;
        this.hair_color = data.hair_color;
        this.skin_color = data.skin_color;
        this.eye_color = data.eye_color;
        this.gender = data.gender;
        this.homeworld = data.homeworld;
    }
}


// @Authorized()
@JsonController('/persons')
export class PersonController {

    constructor(
        private PersonService: PersonService
    ) { }

    @Get()
    @ResponseSchema(Person, { isArray: true })
    public find(@QueryParam("page") page: number): Promise<{ count: number, persons: Person[] }> {
        return this.PersonService.find(page);
    }

    @Get('/:id')
    @OnUndefined(PersonNotFoundError)
    public async one(@Param('id') id: number): Promise<Object | undefined> {
        const person = await this.PersonService.findOne(id);
        return new PersonProfileResponse(person);
    }
}
