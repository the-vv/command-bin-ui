import { Component, inject, input, signal } from '@angular/core';
import { ICommandItem } from '@app/models/command';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '@app/services/toast-service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-command-item',
  imports: [NgClass],
  templateUrl: './command-item.html',
  styles: `:host {
    display: block;
  }`
})
export class CommandItem {

  public command = input.required<ICommandItem>();
  private clipboard = inject(Clipboard);
  private toastService = inject(ToastService);
  protected copied = signal<boolean>(false);

  public copyCommand() {
    if (this.copied()) return;
    this.clipboard.copy(this.command().command);
    this.toastService.showInfo('Command copied to clipboard');
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }

}
