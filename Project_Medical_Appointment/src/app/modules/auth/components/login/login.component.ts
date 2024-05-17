import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/login-credentials';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  //PARTE DE LOGIN AINDA NÃO ESTÁ EM FUNCIONAMENTO

  form!: FormGroup

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void{
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login(): void{
    const user: User = this.form.getRawValue()
    this.authService.login(user).pipe(first()).subscribe({
      complete: () =>{
        this.router.navigate(['appointment', 'list'])
      },
      error: (err) =>{
        console.log(err);
        
      }
    })  
  }
}
