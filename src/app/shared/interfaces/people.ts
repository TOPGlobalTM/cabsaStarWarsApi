import { Person } from './person';

export interface People {
    count: number;
    next: string;
    previous: string;
    results: Person[];
}
