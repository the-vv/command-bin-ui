import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICommandItem } from '@app/models/command';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private http = inject(HttpClient);

  public getCommandsByCategoryId(categoryId: string) {
    if (!categoryId) {
      return of([] as ICommandItem[]);
    }
    return this.http.get<ICommandItem[]>(`${environment.apiBaseUrl}/command/category/${categoryId}`);
  }
  public createCommand(command: ICommandItem) {
    return this.http.post<ICommandItem>(`${environment.apiBaseUrl}/command`, command);
  }
  public updateCommand(command: ICommandItem) {
    return this.http.patch<ICommandItem>(`${environment.apiBaseUrl}/command/${command.id}`, command);
  }
  public deleteCommand(commandId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/command/${commandId}`);
  }
  public getCommandById(commandId: string) {
    return this.http.get<ICommandItem>(`${environment.apiBaseUrl}/command/${commandId}`);
  }
  public getAllCommands() {
    return this.http.get<ICommandItem[]>(`${environment.apiBaseUrl}/command`);
  }
}
