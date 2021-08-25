import { EntityRepository, Repository } from 'typeorm';

import { Person } from '../models/Person';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {

    /**
     * Find by user_id is used for our data-loader to get all needed Persons in one query.
     */
    public findByUserIds(ids: string[]): Promise<Person[]> {
        return this.createQueryBuilder()
            .select()
            .where(`Person.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
