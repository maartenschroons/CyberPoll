import { Injectable } from '@angular/core';
import { Participant } from '../models/participant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient) { }

  //Add a participation
  addParticipation(participation: Participant){
    return this.http.post<Participant>("https://localhost:44311/api/Participation", participation);
  }

  //Get a list of participations by pollid
  getAllParticipationsByPollId(pollid: number): Observable<Participant[]> {
    return this.http.get<Participant[]>("https://localhost:44311/api/Participation/part/" + pollid);
  }

  //Delete a participation
  deleteParticipation(partid: number){
    return this.http.delete<Participant>("https://localhost:44311/api/Participation/" + partid);
  }
}
