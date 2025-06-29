import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@app/models/category';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  public getMyCategories() {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/mine`)
      .pipe(catchError(err => {
        this.toastService.showError(err);
        return of([] as Category[]); // Return an empty array on error
      }))
  }

  public createCategory(category: Category) {
    return this.http.post<Category>(`${environment.apiBaseUrl}/category`, category);
  }

  public updateCategory(category: Category) {
    return this.http.patch<Category>(`${environment.apiBaseUrl}/category/${category.id}`, category);
  }

}