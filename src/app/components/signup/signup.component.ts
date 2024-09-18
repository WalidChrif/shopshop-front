import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm! : FormGroup; 

  constructor(private authService : AuthService,
    private formBuilder : FormBuilder){}

  ngOnInit(){
    this.signUpForm = this.formBuilder.group({
      username: ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]{6,15}')]],
      firstName: ['',[ Validators.required, Validators.pattern('[a-zA-Z]{3,20}')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,20}')]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,15}')]],
    });
  }
signUp() {
  this.authService.register(this.signUpForm.value);
}

}
