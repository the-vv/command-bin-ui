import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICommandItem } from '@app/models/command';
import { ESource } from '@app/models/common';
import { Category } from '@app/models/category';
import { Folder } from '@app/models/folder';
import { CategoryService } from '@app/services/category-service';
import { FolderService } from '@app/services/folder-service';
import { ToastService } from '@app/services/toast-service';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommandService } from '@app/services/command-service';
import { LoadingBtn } from '@app/directives/loading-btn';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-create-command',
  imports: [ReactiveFormsModule, TextFieldModule, LoadingBtn],
  templateUrl: './create-command.html',
  styles: ``
})
export class CreateCommand implements OnInit {

  private categoryService = inject(CategoryService);
  private folderService = inject(FolderService);
  private toastService = inject(ToastService);
  private commandService = inject(CommandService);
  private userService = inject(UserService);

  public selectedSource = input<ESource | null>();
  public selectedSourceId = input<string | null>(null);
  public commandEditItem = input<ICommandItem | null>(null);

  public onCreated = output<ICommandItem>();

  public allCategories = signal<Category[]>([]);
  public allFolders = signal<Folder[]>([]);
  loadingCreate = signal<boolean>(false);

  public commandForm = new FormBuilder().group({
    command: ['', Validators.required],
    description: [''],
    categoryId: [''],
    folderId: ['']
  })

  ngOnInit(): void {
    if (this.selectedSourceId()) {
      if (this.selectedSource() === ESource.CATEGORY) {
        this.commandForm.patchValue({ categoryId: this.selectedSourceId() });
      } else if (this.selectedSource() === ESource.FOLDER) {
        this.commandForm.patchValue({ folderId: this.selectedSourceId() });
      }
    }
    this.loadCategories();
    this.loadFolders();
    if (this.commandEditItem()) {
      this.commandForm.patchValue(this.commandEditItem()!);
    }
  }
  protected get isEditMode() {
    return !!this.commandEditItem();
  }
  private loadCategories(): void {
    this.categoryService.getMyCategories().subscribe({
      next: categories => {
        this.allCategories.set(categories);
      },
      error: err => {
        this.toastService.showError(err)
      }
    });
  }

  private loadFolders(): void {
    this.folderService.getMyFolders().subscribe({
      next: folders => {
        this.allFolders.set(folders);
      },
      error: err => {
        this.toastService.showError(err)
      }
    });
  }

  protected createCommand() {
    if (this.commandForm.invalid) {
      this.commandForm.markAllAsDirty();
      this.toastService.showError('Command is required');
      return;
    }
    const command: ICommandItem & { userId: string } = {
      command: this.commandForm.value.command!.trim() || '',
      description: this.commandForm.value.description?.trim() || '',
      categoryId: this.commandForm.value.categoryId || undefined,
      folderId: this.commandForm.value.folderId || undefined,
      userId: this.userService.user!.id
    };
    this.loadingCreate.set(true);
    if (this.isEditMode) {
      this.commandService.updateCommand({...command, id: this.commandEditItem()!.id}).subscribe({
        next: () => {
          this.loadingCreate.set(false);
          this.toastService.showSuccess('Command updated successfully');
          this.commandForm.reset();
          this.onCreated.emit(command);
        },
        error: err => {
          this.loadingCreate.set(false);
          this.toastService.showError(err);
        }
      });
    } else {
      this.commandService.createCommand(command).subscribe({
        next: () => {
          this.loadingCreate.set(false);
          this.toastService.showSuccess('Command created successfully');
          this.commandForm.reset();
          this.onCreated.emit(command);
        },
        error: err => {
          this.loadingCreate.set(false);
          this.toastService.showError(err);
        }
      });
    }
  }

}
