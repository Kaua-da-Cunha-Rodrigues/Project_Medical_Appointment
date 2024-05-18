import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../../models/login-credentials';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatFormFieldModule],
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
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      role: new FormControl('USER', [Validators.required])
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
