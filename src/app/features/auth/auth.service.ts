import { Injectable } from '@angular/core';
import { Auth, authState, updateProfile } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { BehaviorSubject, from, switchMap } from 'rxjs';
import { SignupCredentials } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.auth) // imported from fire package function

  constructor(private auth: Auth) { }

  public signIn(credentials: Object) {
    this.authState.next(credentials)
  }

  public signUp({ email, password, displayName}: SignupCredentials) {
    // return Promise, then we wrap with from() operator to create an Observable
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      // after creating of user switch on updateProfile function wich add displayName
      switchMap(({ user }) => updateProfile(user, { displayName }))
    );
  }

  public signOut() {
    // return Promise, then we wrap with from() operator to create an Observable
    return from(this.auth.signOut());
  }
}
