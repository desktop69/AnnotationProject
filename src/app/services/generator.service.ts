import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private apiUrl = 'http://127.0.0.1:8000/api/generator';
  constructor(private http: HttpClient) { }
  
  Get(Id: number): Observable<any> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.get<any>(url);
  }
  
}
