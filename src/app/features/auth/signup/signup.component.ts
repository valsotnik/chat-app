import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      displayName: ['', [Validators.minLength(3)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]]
    })
  }

  public signUp() {
    this.auth.signUp(this.form.value).subscribe({
      next: () => this.router.navigate(['chat']),
      error: (error) => this.snackbar.open(error.message)
    })
  }

}
