import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { BehaviorSubject, forkJoin, from, pluck, switchMap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from './auth.model';
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.auth) // imported from fire package function

  constructor(private auth: Auth, private http: HttpClient) { }

  public getCurrentUser () {
    return this.auth.currentUser!;
  }

  public getToken() {
    return this.http.post<{ token: string }>(
      `${environment.apiURL}/createToken`,
      {user: this.getCurrentUser()}
      ).pipe(pluck('token'))
  }

  public signIn({ email, password}: SigninCredentials) {
    // return Promise, then we wrap with from() operator to create an Observable
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public signUp({ email, password, displayName}: SignupCredentials) {
    // return Promise, then we wrap with from() operator to create an Observable
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      // after creating of user switch on updateProfile function wich add displayName
      switchMap(({ user }) => forkJoin([
        updateProfile(user, { displayName }),
        // post new user with usage of createUser cloud function from firebase by this url
        this.http.post(
          `${environment.apiURL}/createUser`,
          { user : {...user, displayName}}
        )
      ]))
    );
  }

  public signOut() {
    const user = this.auth.currentUser;
    // return Promise, then we wrap with from() operator to create an Observable
    return from(this.auth.signOut()).pipe(
      switchMap(() => this.http.post(
        `${environment.apiURL}/revokeUserToken`,
        { user }
      ))
    );
  }
}
