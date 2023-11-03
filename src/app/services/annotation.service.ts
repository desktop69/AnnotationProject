import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annotation } from '../models/Annotation.model';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private apiUrl = 'http://127.0.0.1:8000/api/Annotation';
  constructor(private http: HttpClient) { }
  getAll(): Observable<Annotation[]> {
    return this.http.get<Annotation[]>(this.apiUrl);
  }
  add(data: Annotation): Observable<Annotation> {
    return this.http.post<Annotation>(this.apiUrl, data);
  }
  getById(Id: number) {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.get<Annotation>(this.apiUrl)
  }
  update(Id: number, data: Annotation): Observable<Annotation> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.put<Annotation>(url, data)
  }
  delete(Id: number): Observable<any> {
    const apiUrlWithId = `${this.apiUrl}/${Id}`;
    return this.http.delete(apiUrlWithId);
  }
}
