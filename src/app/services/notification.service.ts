import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  //Get a list of all notifications
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:44311/api/Notification/denied");
  }

  //Add a notification
  addNotification(notification: Notification) {
    return this.http.post<Notification>("https://localhost:44311/api/Notification", notification);
  }

  //Get a list of friendrequests from user
  getAllFriendNotifications(userId: number): Observable<Notification[]> {
    //this.http.get<Notification[]>("https://localhost:44311/api/Notification/friend/" + userId).subscribe(result => {console.log(result)});
    return this.http.get<Notification[]>("https://localhost:44311/api/Notification/friend/" + userId);
  }

  //Get a list of pollrequests from user
  getAllPollNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:44311/api/Notification/poll/" + userId);
  }

  //Get a list of sent requests from user
  getAllSentNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:44311/api/Notification/sender/" + userId);
  }

  //Get a list of all notifications by userId
  getAllNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:44311/api/Notification/receiver/" + userId);
  }

  //Update a notification
  updateNotification(not: Notification) {
    return this.http.put<Notification>("https://localhost:44311/api/Notification/" + not.notificationId, not);
  }

  //Delete a notification
  deleteNotification(notID: number){
    return this.http.delete<Notification>("https://localhost:44311/api/Notification/" + notID);
  }

}
