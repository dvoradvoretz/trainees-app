import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DataGridComponent} from './data-grid/data-grid.component';
import {AnalysisComponent} from './analysis/analysis.component';
import {MonitorComponent} from './monitor/monitor.component';
import {AgGridModule} from 'ag-grid-angular';
import {NgxsModule} from '@ngxs/store';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";
import { DialogAddTraineeComponent } from './dialog-add-trainee/dialog-add-trainee.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TraineeState} from "./store/data-grid/data-grid.state";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    declarations: [
        AppComponent,
        DataGridComponent,
        AnalysisComponent,
        MonitorComponent,
        DialogAddTraineeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        DragDropModule,
        ChartsModule,
        AgGridModule.withComponents(null),
        NgxsModule.forRoot([
            TraineeState
        ]),

    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
