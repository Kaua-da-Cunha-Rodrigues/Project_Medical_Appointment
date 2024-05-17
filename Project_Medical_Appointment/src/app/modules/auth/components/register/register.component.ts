import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../models/login-credentials';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  form!: FormGroup

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void{
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  register(): void{
    const user: User = this.form.getRawValue()
    this.authService.register(user).pipe(first()).subscribe({
      complete: () =>{
        this.router.navigate(['auth', 'login'])
      },
      error: (err) =>{
        console.log(err);
        
      }  
    })
    
  }
}
