import { debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Channel, UserResponse } from 'stream-chat';
import { DefaultStreamChatGenerics, ChatClientService } from 'stream-chat-angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-invite-button',
  templateUrl: './invite-button.component.html',
  styleUrls: ['./invite-button.component.scss']
})
export class InviteButtonComponent implements OnInit {

  @Input() channel!: Channel;

  showDialog = false;

  public userSerchField = new FormControl;

  public availableUsers$!: Observable<UserResponse<DefaultStreamChatGenerics>[]>;

  constructor(private chatClientService: ChatClientService) {}

  public ngOnInit(): void {
    this.availableUsers$ = this.userSerchField.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap((queryString) => this.chatClientService.autocompleteUsers(queryString))
    )
  }

  public addToChat({ option: {value: userId} }: MatAutocompleteSelectedEvent) {
    this.channel.addMembers([userId])

  }

}
