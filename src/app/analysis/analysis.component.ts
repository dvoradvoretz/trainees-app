import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from 'chart';
import {Select, Store} from "@ngxs/store";
import {TraineeState} from "../store/data-grid/data-grid.state";
import {Observable} from "rxjs/index";

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class AnalysisComponent implements OnInit {
    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartLabels: Label[] = [];
    barChartType: ChartType = 'bar';
    chartLegend = true;
    chartPlugins = [];
    barChartData = [
        {data: [], label: 'Average'}];
    lineChartData = [
        {data: [], label: 'Grade'},
    ];
    lineChartLabels = [];
    lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
    };
    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    barChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    lineChartType = 'line';
    charts = [
        {
            title: 'Grades average per subject',
            datasets: this.lineChartData,
            labels: this.lineChartLabels,
            options: this.lineChartOptions,
            colors: this.lineChartColors,
            legend: this.chartLegend,
            chartType: this.lineChartType,
            plugins: this.chartPlugins
        },
        {
            title: 'Grade average over time for students with ID',
            datasets: this.barChartData,
            labels: this.barChartLabels,
            options: this.barChartOptions,
            colors: this.barChartColors,
            legend: this.chartLegend,
            chartType: this.barChartType,
            plugins: this.chartPlugins

        }
    ];

    @Select(TraineeState.getGradeAveragePerSubject) gradeAveragePerSubject: Observable<any[]>;
    @Select(TraineeState.getTraineeAverageById) traineeAverageById: Observable<any[]>;

    constructor(private store: Store) {
        this.gradeAveragePerSubject.subscribe((val: any) => {
            const label_data = val.map((item: any) => item.subject);
            this.lineChartData[0].data.length = 0;
            this.lineChartData[0].data = [...val.map(item => item.average)];
            this.lineChartLabels.length = 0;
            this.lineChartLabels.push(...label_data);
        });
        this.traineeAverageById.subscribe(val => {
            const label_data = val.map((item: any) => item.id);
            this.barChartData[0].data.length = 0;
            this.barChartData[0].data = [...val.map(item => item.average)];
            this.barChartLabels.length = 0;
            this.barChartLabels.push(...label_data);
        })
    };


    ngOnInit(): void {

    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.charts, event.previousIndex, event.currentIndex);
    }
}
