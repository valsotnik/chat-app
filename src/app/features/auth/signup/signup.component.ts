import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  public form!: FormGroup;

  constructor(private auth: AuthService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  public signUp() {
    console.log('signup with: ', this.form.value);
    this.auth.signUp(this.form.value);
  }

}
