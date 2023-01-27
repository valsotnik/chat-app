import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChannelsModule } from '../channels/channels.module';


@NgModule({
  declarations: [
    ChatPageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    TranslateModule.forChild(),
    StreamChatModule,
    StreamAutocompleteTextareaModule,
    ChannelsModule
  ]
})
export class ChatModule { }
