import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-dialog-add-trainee',
    templateUrl: './dialog-add-trainee.component.html',
    styleUrls: ['./dialog-add-trainee.component.scss']
})
export class DialogAddTraineeComponent implements OnInit {
    form: FormGroup;

    constructor(public dialogRef: MatDialogRef<DialogAddTraineeComponent>,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: '',
            name: '',
            subject: '',
            grade: '',
            date: ''
        })
    }

    submit(form: any) {
        this.dialogRef.close(form.value);
    }

    onNoClick() {
        this.dialogRef.close({event: 'Cancel'});
    }
}
