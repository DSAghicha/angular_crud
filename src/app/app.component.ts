import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'angular_crud';

    constructor(private dialog: MatDialog) { }

    openDialog() { 
        this.dialog.open(TaskFormDialogComponent, {
            width: '40%'
        })
    }
}
