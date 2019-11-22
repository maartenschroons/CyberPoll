import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.model';
import { VoteService } from './vote.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http: HttpClient, private _voteService: VoteService) { }

  //Get all answer that match the pollid
  getAllAnswersbyPoll(pollid: number): Observable<Answer[]> {
    return this.http.get<Answer[]>("https://localhost:44311/api/Answer/poll/" + pollid)
  }
  //Add an answer
  addAnswer(answer: Answer) {
    return this.http.post<Answer>("https://localhost:44311/api/Answer", answer);
  }
}
