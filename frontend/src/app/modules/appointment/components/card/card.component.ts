import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AppModel } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { DeleteModalComponent } from '../../../../commons/delete-modal/delete-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  appointments?: AppModel[]

  constructor(public authService: AuthService, private appointmentService: AppointmentService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.getAppointments() 
  }

  getAppointments(): void{
    this.appointmentService
    .getAppointments()
    .pipe(first())
    .subscribe({
      next: (response: AppModel[]) =>{
        this.appointments = response
        console.log(this.appointments);
        
      },
      error: (err) => {
        (console.log(err))
      }
    })
  }

  editAppointment(id: string): void{
    this.router.navigate(['appointment', 'edit', id])
  }

  openModal(id: string): void {
    const dialog = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      //Só fecha quando clicar no botão
      disableClose: true,
      //passa o id para o modal
      data:{
        id,
      }
    });

    dialog
    .afterClosed()
    .pipe(first())
    .subscribe((res) =>{
      if (res){
        this.onDelete(id)
      } 
    })
  }
  onDelete(id: string): void{
    
    this.appointmentService
    .deleteAppointment(id) 
    .pipe(first())
    .subscribe({
      complete: () =>{
        this.getAppointments()
      },
      error: (err) =>{
        (console.log(err))
      } 
     
    }) 
  }
}
