import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  {
    path: 'signin',
    component: SigninComponent,
    // protection from entering a '/signin' route manually when already signin state in chat
    ...canActivate(() => redirectLoggedInTo(['chat']))
  },
  {
    path: 'signup',
    component: SignupComponent,
    // protection from entering a '/signup' route manually when already signin state in chat
    ...canActivate(() => redirectLoggedInTo(['chat']))
  },
  {
    path: 'chat',
    // protection from unautorized users in '/chat' route
    ...canActivate(() => redirectUnauthorizedTo(['signin'])),
    loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
