import { Component } from '@angular/core';
import { CategoryList } from "../category-list/category-list";
import { Spinner } from "../../commons/spinner/spinner";
import { CommandList } from "../command-list/command-list";
import { ICommandItem } from '../../../models/command';

@Component({
  selector: 'app-dashboard',
  imports: [CategoryList, Spinner, CommandList],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {

  sampleCommands: ICommandItem[] = [
    {
      id: '1',
      command: 'ls -la',
      description: 'List all files and directories with details',
      category: 'File System'
    },
    {
      id: '2',
      command: 'git status',
      description: 'Show the working tree status',
      category: 'Git'
    },
    {
      id: '3',
      command: 'npm install',
      description: 'Install all dependencies listed in package.json',
      category: 'Node.js'
    },
    {
      id: '4',
      command: 'docker ps',
      description: 'List running Docker containers',
      category: 'Docker'
    },
    {
      id: '5',
      command: 'python3 script.py',
      description: 'Run a Python script',
      category: 'Python'
    }
  ];

}
