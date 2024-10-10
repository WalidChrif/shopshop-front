import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  keycloak = environment.keycloak;
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]{3,20}')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]{3,20}')],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,15}')],
      ],
    });
  }
  signUpWithGoogle() {
    window.location.href =
      `${this.keycloak.server}/realms/${this.keycloak.realm}` +
      `/protocol/openid-connect/auth` +
      `?client_id=${this.keycloak.clientId}` +
      `&redirect_uri=${this.keycloak.redirectUri}` +
      `&response_type=${this.keycloak.responseType}` +
      `&scope=${this.keycloak.scope}` +
      `&kc_idp_hint=${this.keycloak.kcIdpHint}`;
  }
  signUp() {
    this.authService.register(this.signUpForm.value).subscribe((response) => {
      console.log('signup repsonse::::: ', response);
    });
    this.router.navigate(['/signin'], {
      queryParams: { email: this.signUpForm.get('email') },
    });
  }
}
