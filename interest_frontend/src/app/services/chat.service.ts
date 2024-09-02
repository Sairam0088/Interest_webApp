import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}chats/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }

  createChat(user2: number): Observable<any> {
    return this.http.post(this.apiUrl + 'create_chat/', { user2 }, { headers: this.getAuthHeaders() });
  }

  getChats(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getMessages(chatId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${chatId}/messages/`, { headers: this.getAuthHeaders() });
  }

  sendMessage(chatId: number, content: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    });
    const body = {
      content: content
    };
    return this.http.post(`${this.apiUrl}${chatId}/messages/`, body, { headers });
}
}
