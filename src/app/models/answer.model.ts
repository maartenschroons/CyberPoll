import { Observable } from 'rxjs';
import { Vote } from './vote.model';

export class Answer {
    constructor(public answerId: number, public pollId: number, public userId: number, public text: string, public voteAmount: number){
    
    }
}
