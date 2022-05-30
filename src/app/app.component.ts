import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'angular_crud'
    displayedColumns: string[] = ['id', 'taskTitle', 'taskDescription', 'taskCategory', 'taskDueDate', 'actions'];
    dataSource !: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator !: MatPaginator
    @ViewChild(MatSort) sort !: MatSort

    constructor(private dialog: MatDialog, private api: ApiService) { }

    ngOnInit(): void {
        this.getAllTasks()
    }

    openDialog() { 
        this.dialog.open(TaskFormDialogComponent, {
            width: '40%'
        }).afterClosed().subscribe(() => {
            this.getAllTasks()
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getAllTasks() {
        this.api.getTask()
        .subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res)
                this.dataSource.paginator = this.paginator
                this.dataSource.sort = this.sort
            },
            error: (err) => {
                console.error(err)           
            }
        })
    }

    updateTask(task: any) {
        this.dialog.open(TaskFormDialogComponent, {
            width: '40%',
            data: task
        }).afterClosed().subscribe(() => {
            this.getAllTasks()
        })
    }

    deleteTask(id: number) {
        this.api.deleteTask(id)
        .subscribe({
            next: () => {
                alert("Task Delete Successfully!")
                this.getAllTasks()
            },
            error: () => {
                alert("Unable to delete task!")
            }
        })
    }
}
