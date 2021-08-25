import { HttpError } from 'routing-controllers';

export class PersonNotFoundError extends HttpError {
    constructor() {
        super(404, 'Person not found!');
    }
}
