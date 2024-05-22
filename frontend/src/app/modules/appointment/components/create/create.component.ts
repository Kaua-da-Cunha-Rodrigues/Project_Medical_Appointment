import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModel } from '../../models/appointment.model';
import { first } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{

  form!: FormGroup
  id?: string

  constructor(public authService: AuthService, private appointmentService: AppointmentService, private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.buildForm()  
    
    this.id = this.route.snapshot.params['id']


    if(this.id){
      this.getAppointment(this.id)
    }
  }

  buildForm(): void{
    this.form = new FormGroup({
      specialty: new FormControl(null, [Validators.required]),
      doctor: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      obs: new FormControl(null, [Validators.required]),
      status: new FormControl('SCHEDULED', [Validators.required])
    })
  }

  onSave(): void{  
    const appointmeint: AppModel  = this.form.getRawValue()
    
    //Se existe o id na rota, então quer dizer que está na página de edição, então ele chama o método de editar
    if(this.id){
      this.updateAppointment(appointmeint)  
      return
    }

    //Se não ele passa direto pelo if e considera como criação de produto
    this.createAppointment(appointmeint)  
  
  }

  getAppointment(id: string): void{
    this.appointmentService
    .getAppointmentById(id)
    .pipe(first())
    .subscribe({
      next: (appointmeint) =>{
        //preenche os valores do formulário com os valores puxados através do id do produto
        this.form.patchValue(appointmeint)   
      } ,
      error:(err) =>{
        console.log(err);
        
      } 
    })
  }

  createAppointment(appointmeint: AppModel): void{
    this.appointmentService.createAppointment(appointmeint).pipe(first()).subscribe({
      complete: () =>{
        this.router.navigate(['appointment', 'list'])
      },
      error: (err) =>{
        console.log(err);
        
      }   
    })
  }

  updateAppointment(appointmeint: AppModel):void{
    this.appointmentService
    .updateAppointment(this.id!, appointmeint)
    .pipe(first())
    .subscribe({
      complete: () =>{
        //Quando completa o save de Produto, redireciona a rota para a listagem
        this.router.navigate(['/appointment/list'])    
      } ,
      error:(err) =>{
        console.log(err);
        
      } 
    })
  }
}
