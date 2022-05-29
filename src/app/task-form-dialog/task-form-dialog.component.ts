import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { ApiService } from '../services/api.service'

interface Category {
    value: String
    displayValue: String
}

@Component({
    selector: 'app-task-form-dialog',
    templateUrl: './task-form-dialog.component.html',
    styleUrls: ['./task-form-dialog.component.sass']
})
export class TaskFormDialogComponent implements OnInit {
    taskForm !: FormGroup

    /** Static Category List */
    categories: Category[] = [
        {value: 'office', displayValue: 'Office'},
        {value: 'personal', displayValue: 'Personal'}
    ]
    
    constructor(
        private formBuilder: FormBuilder,
        private api: ApiService,
        private dialogRef: MatDialogRef<TaskFormDialogComponent>) { }

    ngOnInit(): void { 
        this.taskForm = this.formBuilder.group({
            taskTitle: ['', Validators.required],
            taskDescription: ['', Validators.required],
            taskCategory: ['', Validators.required],
            taskDueDate: ['', Validators.required]
        })
    }

    public addTask() {
        if(this.taskForm.valid) {
            this.api.postTask(this.taskForm.value)
            .subscribe({
                next:(res) => {
                    alert("Product added successfully!")
                    this.taskForm.reset()
                    this.dialogRef.close()
                },
                error:() => {
                    alert("Error while adding task!")
                }
            })
        }     
    }
}
