import swapi from 'swapi-node';
import { Cache, CacheContainer } from "node-ts-cache"
import { MemoryStorage } from "node-ts-cache-storage-memory"

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Person } from '../models/Person';

const userCache = new CacheContainer(new MemoryStorage())

@Service()
export class PersonService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    @Cache(userCache, { ttl: Number(process.env.CACHE_TTL) })
    public async find(page: number = 1): Promise<Person[]> {

        this.log.info('Find all Persons');

        const result = await swapi.get(`people?page=${page}`);
        const { results = [] } = result;

        const persons = results.map(item => {
            const { pathname } = new URL(item.url);
            const parts = pathname.split('/');
            const id = Number(parts[parts.length - 1] || parts[parts.length - 2]);

            return new Person(id, item.name, item.birth_year, item.url);
        });

        return persons.sort((a, b) => a.age - b.age);

    }

    @Cache(userCache, { ttl: Number(process.env.CACHE_TTL) })
    public async findOne(id: number): Promise<Object | undefined> {
        this.log.info(`Find Person with id=${id}`);
        const res = await swapi.getPerson(id);
        return res;
    }

}
