import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
    
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void { 
        this.taskForm = this.formBuilder.group({
            taskTitle: ['', Validators.required],
            taskDescription: ['', Validators.required],
            taskCategory: ['', Validators.required],
            taskDueDate: ['', Validators.required]
        })
    }

    public addTask() {
        console.log(this.taskForm.value)
        
    }
}
