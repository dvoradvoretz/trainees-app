import {Component, ViewEncapsulation} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from 'chart';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs/index";
import {TraineeState} from "../store/data-grid/data-grid.state";

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AnalysisComponent {
    chartOptions: ChartOptions = {
        responsive: true,
    };
    chartLegend = true;
    chartPlugins = [];
    chartColors: Color[] = [
        {
            borderColor: '#262c4a',
            backgroundColor: 'rgba(85,110,429,0.38)',
        },
    ];
    barChartLabels: Label[] = [];
    barChartData = [{data: [], label: 'Average'}];
    lineChartData = [{data: [], label: 'Grade'},];
    lineChartLabels = [];
    charts = [
        {
            title: 'Grades average per subject',
            chartType: 'bar',
            datasets: this.lineChartData,
            labels: this.lineChartLabels,
            options: this.chartOptions,
            colors: this.chartColors,
            legend: this.chartLegend,
            plugins: this.chartPlugins
        },
        {
            title: 'Students average for students with chosen id',
            chartType: 'line',
            datasets: this.barChartData,
            labels: this.barChartLabels,
            options: this.chartOptions,
            colors: this.chartColors,
            legend: this.chartLegend,
            plugins: this.chartPlugins

        }
    ];

    @Select(TraineeState.getGradeAveragePerSubject) gradeAveragePerSubject$: Observable<any[]>;
    @Select(TraineeState.getTraineeAverageById) traineeAverageById$: Observable<any[]>;

    constructor(private store: Store) {
        this.gradeAveragePerSubject$.subscribe((data: any) => {
            const label_data = data.map((item: any) => item.subject);
            this.lineChartData[0].data.length = 0;
            this.lineChartData[0].data = [...data.map(item => item.average)];
            this.lineChartLabels.length = 0;
            this.lineChartLabels.push(...label_data);
        });
        this.traineeAverageById$.subscribe(data => {
            const label_data = data.map((item: any) => item.id);
            this.barChartData[0].data.length = 0;
            this.barChartData[0].data = [...data.map(item => item.average)];
            this.barChartLabels.length = 0;
            this.barChartLabels.push(...label_data);
        })
    };

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.charts, event.previousIndex, event.currentIndex);
    }
}
