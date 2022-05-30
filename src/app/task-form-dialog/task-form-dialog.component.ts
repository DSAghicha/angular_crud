import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
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
    actionBtn : string = "Add"

    /** Static Category List */
    categories: Category[] = [
        {value: 'office', displayValue: 'Office'},
        {value: 'personal', displayValue: 'Personal'}
    ]
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public editData: any,
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
        
        if (this.editData) {            
            this.actionBtn = "Update"
            this.taskForm.controls['taskTitle'].setValue(this.editData.taskTitle)
            this.taskForm.controls['taskDescription'].setValue(this.editData.taskDescription)
            this.taskForm.controls['taskCategory'].setValue(this.editData.taskCategory)
            this.taskForm.controls['taskDueDate'].setValue(this.editData.taskDueDate)
        }
    }

    public saveTask() {
        if(this.actionBtn === 'Add' && this.taskForm.valid) {
            this.api.postTask(this.taskForm.value)
            .subscribe({
                next:(res) => {
                    alert("Task added successfully!")
                    this.taskForm.reset()
                    this.dialogRef.close()
                },
                error:() => {
                    alert("Error while adding task!")
                }
            })
        } else if(this.actionBtn === 'Update' && this.taskForm.valid) {
            this.api.putTask(this.taskForm.value, this.editData.id)
            .subscribe({
                next:(res) => {
                    alert("Task updated successfully!")
                    this.taskForm.reset()
                    this.dialogRef.close()
                },
                error:() => {
                    alert("Error while updating task!")
                }                
            })          
        } 
    }
}
