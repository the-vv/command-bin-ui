import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.html',
  styles: ``
})
export class Main {

  protected userService = inject(UserService);

  protected get userName() {
    return this.userService.user?.name || '';
  }

}
