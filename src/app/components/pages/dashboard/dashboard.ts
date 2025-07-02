import { Component, effect, inject, resource, signal } from '@angular/core';
import { CategoryList } from "../category-list/category-list";
import { Spinner } from "../../commons/spinner/spinner";
import { CommandList } from "../command-list/command-list";
import { firstValueFrom } from 'rxjs';
import { CommandService } from '@app/services/command-service';
import { Category } from '@app/models/category';
import { ICommandItem } from '@app/models/command';
import { CommonMenu } from "../common-menu/common-menu";
import { ESource } from '@app/models/common';
import { ToastService } from '@app/services/toast-service';

@Component({
  selector: 'app-dashboard',
  imports: [CategoryList, Spinner, CommandList, CommonMenu],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {

  private commandService = inject(CommandService);
  private toastService = inject(ToastService);
  public selectedSource = signal<ESource | null>(ESource.RECENT);
  public selectedSourceId = signal<string | null>(null);
  public selectedSourceName = signal<string | null>(null);
  public commandResource = resource({
    params: () => ({ source: this.selectedSource(), sourceId: this.selectedSourceId() }),
    loader: (req) => req.params.source ?
      firstValueFrom(this.commandService.getBySource(req.params.source, this.getSourceId()))
      .catch(err => {
        this.toastService.showError(err);
        return [] as ICommandItem[]
      }) :
      Promise.resolve([] as ICommandItem[]),
  });

  constructor() {
    effect(() => {
      if (this.selectedSource() === ESource.FAVORITES) {
        this.selectedSourceName.set('Favorites')
      } else if (this.selectedSource() === ESource.RECENT) {
        this.selectedSourceName.set('Recent Commands')
      }
    })
  }

  private getSourceId() {
    if ([ESource.CATEGORY, ESource.FOLDER].includes(this.selectedSource()!)) {
      return this.selectedSourceId() || '';
    }
    return '';
  }

  public getIconName() {
    switch (this.selectedSource()) {
      case ESource.CATEGORY:
        return 'category';
      case ESource.RECENT:
        return 'history';
      case ESource.FOLDER:
        return 'folder';
      case ESource.FAVORITES:
        return 'star';
      default:
        return 'terminal';
    }
  }

  public selectedCategory(cat: Category) {
    this.selectedSourceId.set(cat.id!);
    this.selectedSourceName.set(cat.name);
    this.selectedSource.set(ESource.CATEGORY);
  }

}
