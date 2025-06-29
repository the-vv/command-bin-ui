import { Component, inject, resource, signal } from '@angular/core';
import { CategoryList } from "../category-list/category-list";
import { Spinner } from "../../commons/spinner/spinner";
import { CommandList } from "../command-list/command-list";
import { firstValueFrom } from 'rxjs';
import { CommandService } from '@app/services/command-service';
import { Category } from '@app/models/category';
import { ICommandItem } from '@app/models/command';

@Component({
  selector: 'app-dashboard',
  imports: [CategoryList, Spinner, CommandList],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {

  private commandService = inject(CommandService);

  public selectedCategory = signal<Category | null>(null)
  public commandResource = resource({
    params: () => ({ categoryId: this.selectedCategory()?.id }),
    loader: (req) => req.params.categoryId ?
      firstValueFrom(this.commandService.getCommandsByCategoryId(req.params.categoryId)) :
      Promise.resolve([] as ICommandItem[]),
  });

  public selectCategory(category: Category) {
    this.selectedCategory.set(category);
  }

}
