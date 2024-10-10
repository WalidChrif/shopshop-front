import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environment';
import { User } from '../../../common/user';
import { AuthService } from '../../../services/auth.service';
import { JwtService } from '../../../services/jwt.service';
import { AppState } from '../../../store';
import * as newAuthActions from '../../../store/new-auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  keycloak = environment.keycloak;
  user: User;
  loginForm!: FormGroup;
  checked!: boolean;
  storage: Storage = sessionStorage;
  userEmail: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.userEmail = this.route.snapshot.queryParams['email'] || null;
    this.loginForm = this.formBuilder.group({
      email: [this.userEmail || '', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,15}')],
      ],
      rememberMe: false,
    });
  }
  signinWithGoogle() {
    window.location.href =
      `${this.keycloak.server}/realms/${this.keycloak.realm}` +
      `/protocol/openid-connect/auth` +
      `?client_id=${this.keycloak.clientId}` +
      `&redirect_uri=${this.keycloak.redirectUri}` +
      `&response_type=${this.keycloak.responseType}` +
      `&scope=${this.keycloak.scope}` +
      `&kc_idp_hint=${this.keycloak.kcIdpHint}`;
  }
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((token) => {
      this.handleToken(token);
      this.router.navigate(['/callback']);
    });
  }

  handleToken(token: any) {
    this.user = this.jwtService.parseToken(token);
    this.storage.setItem('user', JSON.stringify(this.user));
    this.store.dispatch(newAuthActions.login(this.user));
  }
}
