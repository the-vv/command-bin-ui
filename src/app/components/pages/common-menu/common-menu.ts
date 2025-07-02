import { Component, input, model, output } from '@angular/core';
import { ESource } from '@app/models/common';

@Component({
  selector: 'app-common-menu',
  imports: [],
  templateUrl: './common-menu.html',
  styles: ``
})
export class CommonMenu {

  public eSource = ESource;
  public selectedSource = model.required<ESource | null>()

  public chooseRecent() {
    this.selectedSource.set(ESource.RECENT);
  }

  public chooseFavorites() {
    this.selectedSource.set(ESource.FAVORITES);
  }

}
