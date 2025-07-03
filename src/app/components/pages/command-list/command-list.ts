import { Component, input } from '@angular/core';
import { CommandItem } from "../command-item/command-item";
import { Spinner } from '@app/components/commons/spinner/spinner';
import { ICommandItem } from '@app/models/command';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-command-list',
  imports: [CommandItem, Spinner, NgClass],
  templateUrl: './command-list.html',
  styles: `:host {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }`
})
export class CommandList {

  public loading = input(false);
  public commandsList = input.required<ICommandItem[]>()

}
