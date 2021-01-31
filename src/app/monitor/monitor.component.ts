import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls: ['./monitor.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class MonitorComponent implements OnInit {
    private rowData: any;
    private columnDefs: any;
    private rowClassRules: any;

    constructor() {

        this.columnDefs = [
            {headerName: 'ID', field: 'ID', editable: true,
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
        this.rowData = [ // temp data
            {ID: '206302119', name: 'Dvora', average: '64', exams: '5'},
            {ID: '206302119', name: 'Dvora', average: '68', exams: '5'},
            {ID: '206302119', name: 'Dvora', average: '60', exams: '5'},
            {ID: '206302118', name: 'Sara', average: '85', exams: '3'},
            {ID: '206302118', name: 'Sara', average: '100', exams: '3'},
            {ID: '206302118', name: 'Sara', average: '85', exams: '3'},
        ];

        this.rowClassRules = {
            'low-average':'data.average <= 64',
            'high-average': 'data.average >= 65',
        };

    }

    ngOnInit(): void {

    }

}
