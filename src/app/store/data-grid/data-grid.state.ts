import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Trainee, TraineeStateModel} from "../../models/trainee.model";
import {
    AddTrainee, EditTrainee, FilterTraineesByRange, FilterTraineesByTxt, GetAllTrainees, GetAveragesBySubject,
    RemoveTrainee
} from "./data-grid.actions";
import {patch, updateItem} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import * as _ from "lodash";

@State<TraineeStateModel>({
    name: 'trainee',
    defaults: {
        trainees: [],
        filterText: '',
    }
})
@Injectable()
export class TraineeState {
    trainees = [
        {id: '100', name: 'Yael', subject: 'EN', grade: 82, date: '02.01.2020'},
        {id: '100', name: 'Yael', subject: 'EN', grade: 80, date: '02.01.2020'},
        {id: '101', name: 'Sara', subject: 'EN', grade: 89, date: '02.02.2020'},
        {id: '101', name: 'Sara', subject: 'EN', grade: 100, date: '02.02.2020'},
        {id: '102', name: 'Rut', subject: 'EN', grade: 80, date: '02.03.2020'},
        {id: '103', name: 'Gal', subject: 'EN', grade: 100, date: '02.04.2020'},
        {id: '104', name: 'Tal', subject: 'History', grade: 80, date: '02.02.2020'},
        {id: '105', name: 'Shir', subject: 'History', grade: 60, date: '02.02.2020'},
        {id: '105', name: 'Shir', subject: 'History', grade: 100, date: '02.02.2020'},
        {id: '105', name: 'Shir', subject: 'History', grade: 55, date: '02.02.2020'},
        {id: '105', name: 'Shir', subject: 'Mathe', grade: 100, date: '02.02.2020'},
        {id: '106', name: 'Shira', subject: 'Geography', grade: 98, date: '02.02.2020'}
    ];

    @Selector()
    static getAllTrainees(state: TraineeStateModel) {
        return state.trainees
    }

    @Selector()
    static getTraineesAverageAndExamsCnt(state: TraineeStateModel) {
      return  _(state.trainees)
            .groupBy('id')
            .map((objs: any, key: any) => ({
                'id': key,
                'name': objs[0].name,
                'average': _.sumBy(objs, 'grade') / objs.length ,
                'exams': objs.length
            })).value();
    }

    @Selector()
    static getTraineeAverageById(state: TraineeStateModel) {
        return  _(state.trainees)
            .groupBy('id')
            .map((objs: any, key: any) => ({
                'id': key,
                'name': objs[0].name,
                'average': _.sumBy(objs, 'grade') / objs.length ,
            })).value();
    }
    @Selector()
    static getGradeAveragePerSubject(state: TraineeStateModel) {
        return  _(state.trainees)
            .groupBy('subject')
            .map((objs: any, key: any) => ({
                'subject': key,
                'average': _.sumBy(objs, 'grade') / objs.length ,
            })).value();
    }

    @Action(GetAllTrainees)
    getAllTrainees({patchState}: StateContext<TraineeStateModel>,
                   {}: GetAllTrainees) {
        patchState({
            trainees: this.trainees
        });
    }

    @Action(EditTrainee)
    editTrainee(ctx: StateContext<TraineeStateModel>, {payload}: EditTrainee) {
        ctx.setState(
            patch({
                trainees: updateItem<Trainee>(item =>
                    item.id === payload.id, payload)
            })
        )
    }

    @Action(GetAveragesBySubject)
    getTraineesAverageAndExamsCnt({getState, patchState}: StateContext<TraineeStateModel>,
                                  {payload}: GetAveragesBySubject) {
        patchState({
            trainees: getState().trainees.map(a => a.subject != payload)
        })
    }

    @Action(AddTrainee)
    add({getState, patchState}: StateContext<TraineeStateModel>, {payload}: AddTrainee) {
        const state = getState();
        patchState({
            trainees: [...state.trainees, payload]
        })
    }

    @Action(RemoveTrainee)
    remove({getState, patchState}: StateContext<TraineeStateModel>,
           {payload}: RemoveTrainee) {
        patchState({
            trainees: getState().trainees.filter(a => a.id != payload)
        })
    }

    @Action(FilterTraineesByTxt)
    filterByTxt({getState, patchState}: StateContext<TraineeStateModel>, {payload}: FilterTraineesByTxt) {
        const filterKey = payload[0], filterValue = payload[1];
        patchState({
            trainees: getState().trainees.filter(a => a[filterKey] === filterValue)
        })
    }

    @Action(FilterTraineesByRange)
    filterByRange({getState, patchState}: StateContext<TraineeStateModel>, {payload}: FilterTraineesByRange) {
        console.log(payload, 'payoad')
        const filterKey = payload[0], filterValue = payload[1];
        patchState({
            trainees: getState().trainees.filter(a => a[filterKey] > filterValue)
        })
    }
}

