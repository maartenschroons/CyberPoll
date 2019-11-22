import { Injectable } from '@angular/core';

import { Vote } from '../models/vote.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }
//Add a vote
  addVote(vote: Vote){
    return this.http.post<Vote>("https://localhost:44311/api/Votes", vote);
  }

}
