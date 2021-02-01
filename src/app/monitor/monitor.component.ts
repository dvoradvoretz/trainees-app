import {Component, ViewEncapsulation} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TraineeState} from "../store/data-grid/data-grid.state";
import {Observable} from "rxjs/index";
import {GetPassedAndFailedTrainees} from "../store/data-grid/data-grid.actions";

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
export class MonitorComponent {
    passedTrainees = true; // default value = passed trainees selected
    failedTrainees = true; // default value = failed trainees selected
    columnDefs: any;
    rowClassRules: any;
    @Select(TraineeState.getTraineesAverageAndExamsCnt) trainees$: Observable<any[]>;

    constructor(private store: Store) {

        this.columnDefs = [
            {
                headerName: 'ID', field: 'id', editable: true,
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
            {
                headerName: 'Name', field: 'name', editable: true,
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
            'low-average': 'data.average <= 64',
            'high-average': 'data.average >= 65',
        };
    }

    filterData(completed: boolean, param: string) {
        if (!completed) {
            switch (param) {
                case 'Failed': {
                    this.store.dispatch(new GetPassedAndFailedTrainees(65));
                }
                    break;
                case 'Passed': {
                    this.store.dispatch(new GetPassedAndFailedTrainees(64));
                }
                    break;
            }
        } else {
            this.store.dispatch(new GetPassedAndFailedTrainees('show all'));
        }
    }

}
