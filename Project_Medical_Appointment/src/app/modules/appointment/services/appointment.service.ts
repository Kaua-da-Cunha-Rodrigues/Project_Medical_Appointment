import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }


  //função para ser utilizada para enviar o token de validação das funções
  private setHeaders(){
    const token = localStorage.getItem(environment.TOKEN_KEY) ?? ''

    const headers: HttpHeaders = new HttpHeaders().set('Authorization', token)  

    return { headers }
  }
}
