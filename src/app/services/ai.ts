import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  // URL del Backend en Java
  private apiUrl = 'http://localhost:8080/api/v1/ia/consulta';
  
  constructor(private http: HttpClient) {}

  consultarInteligenciaArtificial(pregunta: string) : Observable<any> {
    // Enviamos la pregunta como parámetro de consulta al backend
    return this.http.get<any>(`${this.apiUrl}?pregunta=${encodeURIComponent(pregunta)}`);
  }
}
