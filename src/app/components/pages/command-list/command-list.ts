import { Component, input } from '@angular/core';
import { CommandItem } from "../command-item/command-item";
import { ICommandItem } from '../../../models/command';

@Component({
  selector: 'app-command-list',
  imports: [CommandItem],
  templateUrl: './command-list.html',
  styles: `:host {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }`
})
export class CommandList {

  public commandsList = input.required<ICommandItem[]>()

}
