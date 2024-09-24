import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  checked!: boolean;

  constructor(
    private keyckloakService : KeycloakService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]{6,15}')]],
      password: ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]{6,15}')]],
      rememberMe: false,
    });
  }
  onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
