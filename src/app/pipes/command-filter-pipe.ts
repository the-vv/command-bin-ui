import { Pipe, PipeTransform } from '@angular/core';
import { ICommandItem } from '@app/models/command';

@Pipe({
  name: 'commandFilter'
})
export class CommandFilterPipe implements PipeTransform {

  transform(value: ICommandItem[], searchString?: string) {
    if (!value || !searchString) {
      return value;
    }

    const lowerCaseSearch = searchString.toLowerCase();

    return value.filter(command =>
      command.command.toLowerCase().includes(lowerCaseSearch) ||
      command.description.toLowerCase().includes(lowerCaseSearch)
    );
  }

}
