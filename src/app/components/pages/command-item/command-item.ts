import { Component, inject, input } from '@angular/core';
import { ICommandItem } from '@app/models/command';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '@app/services/toast-service';
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
  private clipboard = inject(Clipboard);
  private toastService = inject(ToastService);

  public copyCommand() {
    this.clipboard.copy(this.command().command);
    this.toastService.showInfo('Command copied to clipboard');
  }

}
