import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export interface ICommandItem {
    id?: string;
    command: string;
    description: string;
    categoryId?: string;
    folderId?: string;
}