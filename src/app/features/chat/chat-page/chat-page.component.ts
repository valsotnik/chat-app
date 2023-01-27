import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from './../../auth/auth.service';
import { environment } from './../../../../environments/environment';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnInit {

  public isChatReady$!: Observable<boolean>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.isChatReady$ = this.auth.getToken().pipe(
      switchMap((streamToken) => this.chatService.init(
        environment.stream.key,
        this.auth.getCurrentUser().uid,
        streamToken
      )),
      switchMap(() => this.channelService.init({
        type: 'messaging',
        members: { $in: [this.auth.getCurrentUser().uid] },
      })),
      map(() => true),
      catchError(() => of(false))
    )
  }

  public onCreate(name: string) {
    const dashName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dashName,
      {
        name,
        members: [this.auth.getCurrentUser().uid]
      }
    );

    from(channel.create());
  }
}
