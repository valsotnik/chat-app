import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService, ChannelActionsContext, CustomTemplatesService, ChannelPreviewContext, DefaultStreamChatGenerics } from 'stream-chat-angular';
import { AuthService } from './../../auth/auth.service';
import { environment } from './../../../../environments/environment';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { Channel } from 'stream-chat';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnInit, AfterViewInit {

  public isChatReady$!: Observable<boolean>;
  @ViewChild('channelActionsTemplate') private channelActionsTemplate!: TemplateRef<ChannelActionsContext>
  @ViewChild('channelPreview') private channelPreview!: TemplateRef<ChannelPreviewContext>

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService,
    private customTemplateService: CustomTemplatesService
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

  public ngAfterViewInit(): void {
    // this.customTemplateService.channelHeaderInfoTemplate$.next(
    //   this.channelPreview
    // )
    this.customTemplateService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    )
  }

  public activateChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this.channelService.setAsActiveChannel(channel);

  }
}
