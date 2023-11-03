import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TDocument } from '../models/Annotation.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://127.0.0.1:8000/api/Document';
  constructor(private http: HttpClient) { }
  getAll(): Observable<TDocument[]> {
    return this.http.get<TDocument[]>(this.apiUrl);
  }
  add(data: TDocument): Observable<TDocument> {
    return this.http.post<TDocument>(this.apiUrl, data);
  }

  getById(Id: number):Observable<TDocument> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.get<TDocument>(url)
  }

  update(Id: number, data: TDocument): Observable<TDocument> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.put<TDocument>(url, data)
  }
  delete(Id: number): Observable<any> {
    const apiUrlWithId = `${this.apiUrl}/${Id}`;
    return this.http.delete(apiUrlWithId);
  }
}