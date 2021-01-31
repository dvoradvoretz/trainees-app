import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from 'chart';
import {Store} from "@ngxs/store";

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class AnalysisComponent implements OnInit {

    public barChartOptions: ChartOptions = {
        responsive: true,
    };
    public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public barChartType: ChartType = 'bar';
    public chartLegend = true;
    public chartPlugins = [];

    public barChartData: ChartDataSets[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
    public lineChartData: ChartDataSets[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    ];
    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public barChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public lineChartType = 'line';
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

    constructor(private store: Store) {
    };

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.charts, event.previousIndex, event.currentIndex);
    }
}
