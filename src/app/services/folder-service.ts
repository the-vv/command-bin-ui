import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast-service';
import { Folder } from '@app/models/folder';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  public getMyFolders() {
    return this.http.get<Folder[]>(`${environment.apiBaseUrl}/folder/mine`)
      .pipe(
        catchError(err => {
          this.toastService.showError(err);
          return of([] as Folder[]); // Return an empty array on error
        })
      );
  }

  folderGetById(folderId: string) {
    return this.http.get<Folder>(`${environment.apiBaseUrl}/folder/${folderId}`);
  }

  public createFolder(folder: Folder) {
    return this.http.post<Folder>(`${environment.apiBaseUrl}/folder`, folder);
  }

  public updateFolder(folderName: string, folderId: string) {
    return this.http.patch<Folder>(`${environment.apiBaseUrl}/folder/${folderId}/name`, { name: folderName });
  }

  shareFolder(folderId: string) {
    return this.http.post(`${environment.apiBaseUrl}/folder/${folderId}/share`, {});
  }

}
