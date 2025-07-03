import { Component, inject, input, signal } from '@angular/core';
import { ICommandItem } from '@app/models/command';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '@app/services/toast-service';
import { NgClass } from '@angular/common';
import { CommonDialog } from "../../commons/common-dialog/common-dialog";
import { CreateCommand } from "../create-command/create-command";
import { Spinner } from "../../commons/spinner/spinner";
import { CommandService } from '@app/services/command-service';
@Component({
  selector: 'app-command-item',
  imports: [NgClass, CommonDialog, CreateCommand, Spinner],
  templateUrl: './command-item.html',
  styleUrl: './command-item.scss',
})
export class CommandItem {

  private commandService = inject(CommandService);
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

  public commandCreated(command: ICommandItem, dialogRef: CommonDialog) {
    dialogRef.close();
    this.commandService.reloadCommands$.next();
  }

  protected deleteCommand() {

  }

}
