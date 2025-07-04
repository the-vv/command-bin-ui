import { Component, inject, model, output, resource, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Spinner } from '@app/components/commons/spinner/spinner';
import { InputValidationDirective } from '@app/directives/input-validation';
import { LoadingBtn } from '@app/directives/loading-btn';
import { Category } from '@app/models/category';
import { ESource } from '@app/models/common';
import { CategoryService } from '@app/services/category-service';
import { ToastService } from '@app/services/toast-service';
import { UserService } from '@app/services/user';
import { firstValueFrom } from 'rxjs';
import { FolderService } from '@app/services/folder-service';
import { Folder } from '@app/models/folder';
import { CommonDialog } from '@app/components/commons/common-dialog/common-dialog';

@Component({
  selector: 'app-folder-list',
  imports: [CommonDialog, ReactiveFormsModule, LoadingBtn, InputValidationDirective, NgClass, Spinner],
  templateUrl: './folder-list.html',
  styles: ``
})
export class FolderList {

  public eSource = ESource;
  public selectedSource = model.required<ESource | null>();
  private folderService = inject(FolderService);
  private userService = inject(UserService)
  private toastService = inject(ToastService); // Assuming ToastService is used for error handling
  public categoryChanged = output<Category>();
  protected selectedFolderId = signal<Category['id']>('');
  protected categoryForm = new FormBuilder().group({
    name: ['', Validators.required],
  });
  protected loadingCreate = signal<boolean>(false);

  public folderResource = resource({
    loader: () => firstValueFrom(this.folderService.getMyFolders())
  })

  public createFolder(dialogRef: CommonDialog) {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsDirty();
      this.toastService.showError('Folder name is required');
      return;
    }
    const category: Folder = {
      name: this.categoryForm.value.name?.trim() || '',
      userId: this.userService.user?.id || ''
    }
    this.loadingCreate.set(true);
    this.folderService.createFolder(category).subscribe({
      next: (createdCategory) => {
        this.selectFolder(createdCategory);
        this.loadingCreate.set(false);
        dialogRef.close();
        this.folderResource.reload();
        this.categoryForm.reset();
        this.toastService.showSuccess(`Folder created successfully!`);
      },
      error: (err) => {
        this.toastService.showError(err);
        this.loadingCreate.set(false);
      }
    });
  }

  public selectFolder(folder: Folder) {
    this.selectedFolderId.set(folder.id!);
    this.categoryChanged.emit(folder);
  }

}
