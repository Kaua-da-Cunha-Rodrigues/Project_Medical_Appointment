import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/login-credentials';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatToolbarModule, MatSelectModule, MatInputModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form!: FormGroup

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void{
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),  
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  login(): void{
    const user: User = this.form.getRawValue()
    this.authService.login(user).pipe(first()).subscribe({
      next: (res) =>{
        localStorage.setItem(environment.TOKEN_KEY, `Bearer ${res.token}`)
        
        this.router.navigate(['appointment', 'list'])
      },
      error: (err) =>{
        console.log(err);
        
      }
    })  
  }
}
