import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {MatDialog} from "@angular/material/dialog";
import {Trainee} from "../models/trainee.model";
import {Observable} from "rxjs/index";
import {DialogAddTraineeComponent} from "../dialog-add-trainee/dialog-add-trainee.component";
import {TraineeState} from "../store/data-grid/data-grid.state";
import {
    AddTrainee, EditTrainee, FilterTraineesByTxt, GetAllTrainees,
    RemoveTrainee
} from "../store/data-grid/data-grid.actions";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})

export class DataGridComponent implements OnInit {
    rowSelection = 'single';
    id: string;
    name: string;
    subject: string;
    grade: number;
    date: string;
    selectedTrainee: Trainee;
    form: FormGroup;


    @Select(TraineeState.getAllTrainees) trainees$: Observable<Trainee[]>;

    constructor(private store: Store,
                public dialog: MatDialog,
                private formBuilder: FormBuilder) {
        this.store.dispatch(new GetAllTrainees());
    }

    onRowSelected(event: any) {
        if (event.node.selected) {
            this.selectedTrainee = event.node.data;
            this.form = this.formBuilder.group({
                id: this.selectedTrainee.id,
                name: this.selectedTrainee.name,
                subject: this.selectedTrainee.subject,
                grade: this.selectedTrainee.grade,
                date: this.selectedTrainee.date
            });
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddTraineeComponent, {
            width: '350px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(newTrainee => {
            if (newTrainee.id) {
                this.addTrainee(newTrainee);
            }
        });
    }

    addTrainee(newTrainee: Trainee) {
        this.store.dispatch(new AddTrainee(newTrainee))
    }

    deleteTrainee() {
        if (this.selectedTrainee.id) {
            this.store.dispatch(new RemoveTrainee(this.selectedTrainee.id))
        }
    }

    submit(form: any) {
        this.store.dispatch(new EditTrainee(form.value));
    }

    filterGrid(event: any) {
        this.store.dispatch(new GetAllTrainees()); // reset filter
        const keyValue = event.target.value.split(':' ,2);
        this.store.dispatch(new FilterTraineesByTxt(keyValue));
    }

    columnDefs = [
        {headerName: 'ID', field: 'id', editable: true},
        {headerName: 'Name', field: 'name', editable: true},
        {headerName: 'Date', field: 'date', editable: true},
        {
            headerName: 'Grade', field: 'grade', editable: true,
            filter: 'agNumberColumnFilter'
        },
        {headerName: 'Subject', field: 'subject', editable: true}
    ];

    ngOnInit(): void {
    }
}
