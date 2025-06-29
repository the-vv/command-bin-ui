import { Component, inject, output, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '@app/services/category-service';
import { CommonDialog } from "../../commons/common-dialog/common-dialog";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast';
import { UserService } from '@app/services/user';
import { Category } from '@app/models/category';
import { LoadingBtn } from '@app/directives/loading-btn';
import { InputValidationDirective } from '@app/directives/input-validation';
import { firstValueFrom, tap } from 'rxjs';
import { NgClass } from '@angular/common';
import { Spinner } from "../../commons/spinner/spinner";

@Component({
  selector: 'app-category-list',
  imports: [CommonDialog, ReactiveFormsModule, LoadingBtn, InputValidationDirective, NgClass, Spinner],
  templateUrl: './category-list.html',
  styles: ``
})
export class CategoryList {

  private categoryService = inject(CategoryService);
  private userService = inject(UserService)
  private toastService = inject(ToastService); // Assuming ToastService is used for error handling
  public categoryChanged = output<string>();
  protected selectedCategoryId = '';
  protected categoryForm = new FormBuilder().group({
    name: ['', Validators.required],
    description: ['']
  });
  protected loadingCreate = false;

  public categoryResource = resource({
    loader: () => firstValueFrom(this.categoryService.getMyCategories()
      .pipe(tap(categories => {
        if (categories.length > 0) {
          this.selectedCategoryId = categories[0].id!; // Select the first category by default
          this.categoryChanged.emit(this.selectedCategoryId);
        } else {
          this.selectedCategoryId = '';
        }
      })))
  })

  public createCategory(dialogRef: CommonDialog) {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsDirty();
      this.toastService.showError('Category name is required');
      return;
    }
    const category: Category = {
      name: this.categoryForm.value.name?.trim() || '',
      description: this.categoryForm.value.description?.trim() || '',
      userId: this.userService.user?.id || ''
    }
    this.loadingCreate = true;
    this.categoryService.createCategory(category).subscribe({
      next: (createdCategory) => {
        this.selectCategory(createdCategory.id!);
        this.loadingCreate = false;
        dialogRef.close();
        this.categoryResource.reload();
        this.categoryForm.reset();
        this.toastService.showSuccess(`Category created successfully!`);
      },
      error: (err) => {
        this.toastService.showError(err);
        this.loadingCreate = false;
      }
    });
  }

  public selectCategory(categoryId: string) {
    this.selectedCategoryId = categoryId;
    this.categoryChanged.emit(categoryId);
  }

}
