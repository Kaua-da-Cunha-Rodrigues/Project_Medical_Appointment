import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppModel } from '../models/appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apiUrl = `${environment.API_URL}/appointments`

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<AppModel []>{
    return this.http.get<AppModel[]>(this.apiUrl)
  }
  
  getAppointmentById(id: string): Observable<AppModel>{
   return this.http.get<AppModel>(`${this.apiUrl}/${id}`)
   
  }

  createAppointment(appointmeint: AppModel): Observable<void>{
    return this.http.post<void>(this.apiUrl, appointmeint)
  }

  updateAppointment(id: string, appointmeint: AppModel): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, appointmeint)  
  }

  deleteAppointment(id: string): Observable<void>{
   return this.http.delete<void>(`${this.apiUrl}/${id}`) 
  }
}
