import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from './../../auth/auth.service';
import { environment } from './../../../../environments/environment';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnInit {

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.auth.getToken().pipe(
      switchMap((token) => this.chatService.init(
        environment.stream.key,
        this.auth.getCurrentUser().uid,
        token
      ))
    )
    this.streamI18nService.setTranslation();
  }

}
