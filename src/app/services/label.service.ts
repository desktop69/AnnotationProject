import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Label } from '../models/Label.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private apiUrl = 'http://127.0.0.1:8000/api/label';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Label[]> {
    return this.http.get<Label[]>(this.apiUrl);
  }
  add(data: Label): Observable<Label> {
    return this.http.post<Label>(this.apiUrl, data);
  }
  getById(Id: number) {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.get<Label>(this.apiUrl)
  }
  update(Id: number, data: Label): Observable<Label> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.put<Label>(url, data)
  }
  delete(Id: number): Observable<any> {
    const apiUrlWithId = `${this.apiUrl}/${Id}`;
    return this.http.delete(apiUrlWithId);
  }
}
