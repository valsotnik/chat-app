import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { InviteButtonComponent } from './invite-button/invite-button.component';
import { StreamChatModule } from 'stream-chat-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    NewChannelComponent,
    InviteButtonComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StreamChatModule,
    MatAutocompleteModule
  ],
  exports: [
    NewChannelComponent,
    InviteButtonComponent
  ]
})
export class ChannelsModule { }
