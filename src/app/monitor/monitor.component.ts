import {Component, ViewEncapsulation} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TraineeState} from "../store/trainees/trainees.state";
import {Observable} from "rxjs/index";
import {GetPassedAndFailedTrainees} from "../store/trainees/trainees.actions";

export const failed = 64, passed = 65;

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
                    this.store.dispatch(new GetPassedAndFailedTrainees(passed));
                }
                    break;
                case 'Passed': {
                    this.store.dispatch(new GetPassedAndFailedTrainees(failed));
                }
                    break;
            }
        } else {
            this.store.dispatch(new GetPassedAndFailedTrainees('show all'));
        }
    }

}
