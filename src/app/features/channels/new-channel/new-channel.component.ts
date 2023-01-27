import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent {

  @Output() saved = new EventEmitter<string>();
  public channelName = new FormControl

  public onCreate() {
    this.saved.emit(this.channelName.value);
    this.channelName.reset('')
  }

}
