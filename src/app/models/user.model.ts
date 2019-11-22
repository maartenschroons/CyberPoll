import { Observable } from 'rxjs';
import { Poll } from './poll.model';
import { Answer } from './answer.model';
import { Vote } from './vote.model';

export class User {
    constructor(public userId: number, public email: string, public username: string, public password: string, public token: string){
    }
}
