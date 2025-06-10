import { Component, input } from '@angular/core';
import { ICommandItem } from '../../../models/command';

@Component({
  selector: 'app-command-item',
  imports: [],
  templateUrl: './command-item.html',
  styles: `:host {
    display: block;
  }`
})
export class CommandItem {

  public command = input.required<ICommandItem>();


}
