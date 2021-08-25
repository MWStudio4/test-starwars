// import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Get, JsonController, OnUndefined, Param, QueryParam } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { PersonNotFoundError } from '../errors/PersonNotFoundError';
import { Person } from '../models/Person';
import { PersonService } from '../services/PersonService';

// @Authorized()
@JsonController('/persons')
export class PersonController {

    constructor(
        private PersonService: PersonService
    ) { }

    @Get()
    @ResponseSchema(Person, { isArray: true })
    public find(@QueryParam("page") page: number): Promise<Person[]> {
        return this.PersonService.find(page);
    }

    @Get('/:id')
    @OnUndefined(PersonNotFoundError)
    @ResponseSchema(Person)
    public one(@Param('id') id: string): Promise<Person | undefined> {
        return this.PersonService.findOne(id);
    }
}
