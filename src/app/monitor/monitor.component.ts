import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Select} from "@ngxs/store";
import {TraineeState} from "../store/data-grid/data-grid.state";
import {Observable} from "rxjs/index";

export interface Task {
    name: string;
    completed: boolean;
    subtasks?: Task[];
}

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls: ['./monitor.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class MonitorComponent implements OnInit {
    passedTrainees = true;
    failedTrainees = true;
    private rowData: any;
    private columnDefs: any;
    private rowClassRules: any;
    @Select(TraineeState.getTraineesAverageAndExamsCnt) trainees$: Observable<any[]>;

    constructor() {

        this.columnDefs = [
            {headerName: 'ID', field: 'id', editable: true,
                filter: 'agMultiColumnFilter',
                filterParams: {
                    filters: [
                        {
                            filterParams: {
                                defaultOption: 'startsWith',
                            },

                        },
                        {
                            filter: 'agSetColumnFilter',
                        },
                    ],
                },
            },
            {headerName: 'Name', field: 'name', editable: true,
                filter: 'agMultiColumnFilter',
                filterParams: {
                    filters: [
                        {
                            filter: 'agSetColumnFilter',
                            filterParams: {
                                defaultOption: 'startsWith',
                            },
                        }
                    ],
                },
            },
            {headerName: 'Average', field: 'average', editable: true},
            {headerName: 'Exams', field: 'exams', editable: true},
        ];

        this.rowClassRules = {
            'low-average':'data.average <= 64',
            'high-average': 'data.average >= 65',
        };
    }
    setAll(completed: boolean) {
        // this.allComplete = completed;
        // if (this.task.subtasks == null) {
        //     return;
        // }
        // this.task.subtasks.forEach(t => t.completed = completed);
    }

    ngOnInit(): void {

    }

}
